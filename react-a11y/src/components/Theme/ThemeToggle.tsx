"use client";

import { IconButton, Tooltip } from "@radix-ui/themes";
import { MoonIcon, SunIcon, DesktopIcon } from "@radix-ui/react-icons";
import { useAppTheme } from "./ThemeProvider";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { appearance, toggleAppearance, setAppearance } = useAppTheme();

  const icon =
    appearance === "dark" ? (
      <MoonIcon />
    ) : appearance === "light" ? (
      <SunIcon />
    ) : (
      <DesktopIcon />
    );
  const label =
    appearance === "dark"
      ? "Switch to light"
      : appearance === "light"
      ? "Switch to dark"
      : "Toggle theme";

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

      <Tooltip content="Follow system">
        <IconButton
          aria-label="Follow system theme"
          variant="ghost"
          onClick={() => setAppearance("inherit")}
          className={styles.themeToggleSpacing}
        >
          <DesktopIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
