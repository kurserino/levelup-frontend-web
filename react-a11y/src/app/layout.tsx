import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { AppThemeProvider } from "@/components/Theme/ThemeProvider";

export const metadata: Metadata = {
  title: "Fruit Cards – A11y Demo",
  description:
    "Accessible fruit gallery with filters using Next.js, TypeScript and Radix UI.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <AppThemeProvider asChild>
        <body>{children}</body>
      </AppThemeProvider>
    </html>
  );
}
