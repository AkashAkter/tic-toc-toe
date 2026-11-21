import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcade Tic-Tac-Toe | Modern Dark Arena",
  description: "A modern dark arcade Tic-Tac-Toe game powered by Next.js, TypeScript, and Minimax AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full bg-[#040407] text-slate-100 antialiased font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
