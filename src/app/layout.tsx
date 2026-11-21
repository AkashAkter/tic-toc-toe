import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tic-Tac-Toe — The Boring Edition",
  description: "A clean, monochrome Tic-Tac-Toe game inspired by minimalist editorial brutalism.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark" suppressHydrationWarning>
      <body
        className="min-h-full bg-[var(--bg)] text-[var(--fg)] antialiased font-mono"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
