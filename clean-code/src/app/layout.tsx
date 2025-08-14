import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";

export const metadata: Metadata = {
  title: "Note App",
  description: "Don't forget your notes",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider asChild>
        <body data-app-root="1" suppressHydrationWarning={true as any}>{children}</body>
      </ThemeProvider>
    </html>
  );
}


