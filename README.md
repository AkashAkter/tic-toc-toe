# Tic-Tac-Toe — The Boring Edition

A clean, minimalist monochrome Tic-Tac-Toe game built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Features a pure JavaScript Minimax AI engine and local two-player multiplayer.

---

## Features

- **Play vs Computer**: 3 intelligent difficulty modes:
  - **Easy**: Mostly random moves with occasional blocks.
  - **Medium**: Blocks immediate winning threats and takes wins.
  - **Impossible**: Unbeatable AI powered by the **Minimax** algorithm.
- **2-Player Local Multiplayer**: Pass-and-play on the same screen.
- **Monochrome Design**: Brutalist black & white aesthetic with zero box-shadows, zero rounded corners, and sharp 1px borders.
- **Light & Dark Mode**: One-click theme switcher, persisted in `localStorage`.
- **Persistent Scoreboard**: Tracks Player wins, Computer/P2 wins, and Ties across page reloads.
- **Synthesized Arcade Audio**: Web Audio API sound effects with zero external audio files and a mute toggle.
- **100% Client-Side**: No backend or external APIs required.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI & State**: React 19, React Hooks
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation & FX**: Framer Motion, Canvas Confetti

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the local development server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build & Deployment

To create an optimized production build:
```bash
npm run build
```

Ready for one-click deployment on [Vercel](https://vercel.com).
