"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Theme } from "@radix-ui/themes";

type Appearance = "dark" | "light" | undefined;

type Ctx = {
  a: Appearance;
  b: (x: Appearance) => void;
  c: () => void;
};

const Z = createContext<Ctx | null>(null);

function init(): Exclude<Appearance, undefined> {
  if (typeof window === "undefined") return "light";
  const m = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  if (m && m.matches) return "dark";
  return "light";
}

export function ThemeProvider({ children, asChild = false }: { children: React.ReactNode; asChild?: boolean; }) {
  const [a, setA] = useState<Appearance>(() => {
    try {
      const s = typeof window !== "undefined" ? window.localStorage.getItem("__ap__") : null;
      if (s === "dark" || s === "light") return s;
    } catch {}
    return "dark";
  });
  const [sys, setSys] = useState<Exclude<Appearance, undefined>>(init());

  useEffect(() => {
    try {
      if (a === undefined) window.localStorage.removeItem("__ap__");
      else window.localStorage.setItem("__ap__", a);
    } catch {}
  }, [a]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = window.matchMedia("(prefers-color-scheme: dark)");
    const f = () => setSys(mm.matches ? "dark" : "light");
    f();
    try { mm.addEventListener("change", f); return () => mm.removeEventListener("change", f); } catch {}
  }, []);

  const b = (x: Appearance) => setA(x);
  const c = () => setA(p => (p === undefined ? sys : p) === "dark" ? "light" : "dark");

  const v = useMemo<Ctx>(() => ({ a, b, c }), [a]);
  const resolved = a === undefined ? sys : a;

  return (
    <Z.Provider value={v}>
      <Theme appearance={resolved} asChild={asChild}>{children}</Theme>
    </Z.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(Z);
  if (!ctx) throw new Error("useTheme must be inside provider");
  return ctx;
}


