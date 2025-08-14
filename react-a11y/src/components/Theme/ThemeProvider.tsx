"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Theme } from "@radix-ui/themes";

type Appearance = "light" | "dark" | "inherit";

type AppThemeContextValue = {
  appearance: Appearance;
  setAppearance: (_appearance: Appearance) => void;
  toggleAppearance: () => void;
};

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

function getSystemAppearance(): Exclude<Appearance, "inherit"> {
  // Default to dark during SSR to avoid light-first flash; adjust on client
  if (typeof window === "undefined") return "dark";
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialAppearance(): Appearance {
  if (typeof window === "undefined") return "inherit";
  try {
    const stored = window.localStorage.getItem("app-theme-appearance");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Ignore errors
  }
  return "inherit";
}

type AppThemeProviderProps = {
  children: React.ReactNode;
  asChild?: boolean;
};

export function AppThemeProvider({
  children,
  asChild = false,
}: AppThemeProviderProps) {
  const [appearance, setAppearanceState] =
    useState<Appearance>(getInitialAppearance);
  // Track system appearance separately so that when user preference is
  // set to "inherit" we can still provide an explicit light/dark value
  // to Radix Theme on the client. This avoids defaulting to light when
  // the OS is actually dark.
  const [systemAppearance, setSystemAppearance] = useState<
    Exclude<Appearance, "inherit">
  >(getSystemAppearance());

  // On client, restore explicit user preference if it exists in storage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("app-theme-appearance");
      if (stored === "light" || stored === "dark") {
        setAppearanceState(stored);
      }
    } catch {
      // Ignore errors
    }
  }, []);

  // Persist preference when explicitly set to light/dark
  useEffect(() => {
    try {
      if (appearance === "inherit") {
        window.localStorage.removeItem("app-theme-appearance");
      } else {
        window.localStorage.setItem("app-theme-appearance", appearance);
      }
    } catch {
      // Ignore errors
    }
  }, [appearance]);

  // Reflect system preference changes and keep local state in sync
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      setSystemAppearance(media.matches ? "dark" : "light");
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const setAppearance = useCallback((next: Appearance) => {
    setAppearanceState(next);
  }, []);

  const toggleAppearance = useCallback(() => {
    setAppearanceState((prev) => {
      const resolvedPrev = prev === "inherit" ? systemAppearance : prev;
      return resolvedPrev === "dark" ? "light" : "dark";
    });
  }, [systemAppearance]);

  const value = useMemo<AppThemeContextValue>(
    () => ({ appearance, setAppearance, toggleAppearance }),
    [appearance, setAppearance, toggleAppearance]
  );

  // Resolve the effective appearance passed to Radix Theme.
  // When set to inherit, we explicitly provide the current system value
  // to avoid light-first flashes on dark systems.
  const resolvedAppearance: Exclude<Appearance, "inherit"> =
    appearance === "inherit" ? systemAppearance : appearance;

  return (
    <AppThemeContext.Provider value={value}>
      <Theme
        appearance={resolvedAppearance}
        accentColor="gray"
        grayColor="sage"
        radius="medium"
        scaling="100%"
        hasBackground={true}
        asChild={asChild}
      >
        {children}
      </Theme>
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  const ctx = useContext(AppThemeContext);
  if (!ctx)
    throw new Error("useAppTheme must be used within <AppThemeProvider>");
  return ctx;
}
