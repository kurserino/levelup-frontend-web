import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emoji Explorer',
  description: 'Emoji listing with navigation and tests'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


