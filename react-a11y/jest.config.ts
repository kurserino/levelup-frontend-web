import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
};

export default createJestConfig(config);
