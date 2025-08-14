#!/usr/bin/env node
/*
 Simple interactive selector to run a script inside one of the subprojects.
 Usage from root package.json scripts: node scripts/select-project-and-run.js <scriptName> [-- ...args]
*/

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { spawn } = require('child_process');

const ROOT_DIR = path.resolve(__dirname);
const PROJECTS = [
  { label: 'clean-code', dir: 'clean-code' },
  { label: 'react-a11y', dir: 'react-a11y' },
  { label: 'react-testing', dir: 'react-testing' },
];

function detectPackageManager(projectDir) {
  const yarnLockPath = path.join(projectDir, 'yarn.lock');
  const npmLockPath = path.join(projectDir, 'package-lock.json');
  if (fs.existsSync(yarnLockPath)) return 'yarn';
  if (fs.existsSync(npmLockPath)) return 'npm';
  // Default to npm if no lockfile detected
  return 'npm';
}

function readProjectPackageJson(projectDir) {
  const pkgPath = path.join(projectDir, 'package.json');
  if (!fs.existsSync(pkgPath)) return null;
  try {
    const content = fs.readFileSync(pkgPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

function runScriptInProject(project, scriptName, extraArgs) {
  const projectDir = path.join(ROOT_DIR, project.dir);
  const pkg = readProjectPackageJson(projectDir);
  if (!pkg) {
    console.error(`\nProject "${project.label}" does not have a valid package.json at ${projectDir}.`);
    process.exit(1);
  }
  if (!pkg.scripts || !pkg.scripts[scriptName]) {
    console.error(`\nScript "${scriptName}" does not exist in project "${project.label}".`);
    const available = pkg.scripts ? Object.keys(pkg.scripts).join(', ') : '(none)';
    console.error(`Available scripts: ${available}`);
    process.exit(1);
  }

  const pm = detectPackageManager(projectDir);
  const isYarn = pm === 'yarn';
  const baseCmd = isYarn ? 'yarn' : 'npm';
  const args = isYarn ? [scriptName, ...extraArgs] : ['run', scriptName, ...extraArgs];

  console.log(`\n> Running "${scriptName}" in ${project.label} with ${pm}...\n`);

  const child = spawn(baseCmd, args, {
    cwd: projectDir,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, FORCE_COLOR: '1' },
  });

  child.on('exit', (code) => process.exit(code));
}

async function promptProjectSelection(scriptName, extraArgs) {
  try {
    const { project } = await inquirer.prompt([
      {
        type: 'list',
        name: 'project',
        message: 'Select a project to run the command:',
        choices: PROJECTS.map((p) => ({ name: p.label, value: p })),
        pageSize: PROJECTS.length,
      },
    ]);
    runScriptInProject(project, scriptName, extraArgs);
  } catch (error) {
    if (error && (error.isTtyError || error.name === 'ExitPromptError')) {
      console.error('\nOperation cancelled.');
      process.exit(1);
    }
    console.error('\nError running prompt:', error?.message || error);
    process.exit(1);
  }
}

function main() {
  const [, , scriptName, ...rest] = process.argv;
  if (!scriptName) {
    console.error('Usage: node cli.js <scriptName> [-- ...args]');
    process.exit(1);
  }

  // Optional non-interactive flag: --project=<name>
  const projectFlag = rest.find((arg) => arg.startsWith('--project='));
  const extraArgs = rest.filter((arg) => !arg.startsWith('--project='));
  if (projectFlag) {
    const projectName = projectFlag.split('=')[1];
    const selected = PROJECTS.find((p) => p.label.toLowerCase() === String(projectName).toLowerCase());
    if (!selected) {
      console.error(`Invalid project: ${projectName}`);
      process.exit(1);
    }
    runScriptInProject(selected, scriptName, extraArgs);
    return;
  }

  promptProjectSelection(scriptName, rest);
}

main();


