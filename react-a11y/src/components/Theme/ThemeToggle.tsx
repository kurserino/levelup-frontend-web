"use client";

import { IconButton, Tooltip } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useAppTheme } from "./ThemeProvider";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { resolvedAppearance, toggleAppearance } = useAppTheme();

  const icon = resolvedAppearance === "dark" ? <MoonIcon /> : <SunIcon />;
  const label =
    resolvedAppearance === "dark" ? "Switch to light" : "Switch to dark";

  return (
    <div role="group" aria-label="Theme controls">
      <Tooltip content={label}>
        <IconButton
          aria-label={label}
          variant="soft"
          onClick={toggleAppearance}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </div>
  );
}
