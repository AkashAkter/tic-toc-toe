import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark`}
    >
      <body className="min-h-full bg-[#040407] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
