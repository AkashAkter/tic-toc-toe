'use client';

import React, { useSyncExternalStore } from 'react';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import { GameBoard } from '@/components/GameBoard';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameStatus } from '@/components/GameStatus';
import { DifficultySelector } from '@/components/DifficultySelector';
import { Controls } from '@/components/Controls';
import { GameResultModal } from '@/components/GameResultModal';

const emptySubscribe = () => () => {};

export default function TicTacToePage() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const {
    board,
    turn,
    gameStatus,
    winningLine,
    scores,
    preferences,
    showResultModal,
    handleCellClick,
    restartMatch,
    resetScores,
    setGameMode,
    setDifficulty,
    setStartingPlayer,
    toggleSound,
    toggleTheme,
    closeResultModal,
  } = useTicTacToe();

  const isBoardDisabled =
    gameStatus === 'thinking' || gameStatus === 'won' || gameStatus === 'draw';

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-between font-mono antialiased transition-colors duration-150"
    >
      {/* Top Navbar */}
      <header className="w-full border-b border-theme" suppressHydrationWarning>
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between text-xs font-mono">
          <span className="font-bold tracking-tight">TIC-TAC-TOE</span>
          <button
            type="button"
            onClick={toggleTheme}
            className="hover:underline cursor-pointer uppercase font-semibold"
            aria-label="Toggle theme mode"
          >
            {isMounted && preferences.theme === 'light'
              ? '[☾ Dark Theme]'
              : '[☀ Light Theme]'}
          </button>
        </div>
      </header>

      {/* Main Split Layout: Cohesive, Balanced & Centered */}
      <main
        suppressHydrationWarning
        className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-14"
      >
        {/* Left Side: Unified Controls & Stats */}
        <section className="w-full max-w-[340px] flex flex-col gap-3.5" suppressHydrationWarning>
          {/* Status */}
          <GameStatus
            status={gameStatus}
            turn={turn}
            winningLine={winningLine}
            gameMode={preferences.gameMode}
          />

          {/* Scoreboard */}
          <ScoreBoard
            scores={scores}
            gameMode={preferences.gameMode}
            onResetScores={resetScores}
          />

          {/* AI Difficulty Selector (Hidden in 2-Player mode) */}
          {preferences.gameMode === 'ai' && (
            <DifficultySelector
              difficulty={preferences.difficulty}
              onChange={setDifficulty}
              isDisabled={gameStatus === 'thinking'}
            />
          )}

          {/* Mode Switcher, Opening Turn & Controls */}
          <Controls
            gameMode={preferences.gameMode}
            startingPlayer={preferences.startingPlayer}
            soundEnabled={preferences.soundEnabled}
            theme={preferences.theme}
            isDisabled={gameStatus === 'thinking'}
            onRestart={restartMatch}
            onToggleGameMode={setGameMode}
            onToggleStartingPlayer={setStartingPlayer}
            onToggleSound={toggleSound}
            onToggleTheme={toggleTheme}
          />
        </section>

        {/* Right Side: Proportional 3x3 Game Board */}
        <section className="w-full max-w-[340px] flex flex-col items-center justify-center" suppressHydrationWarning>
          <GameBoard
            board={board}
            winningLine={winningLine}
            isDisabled={isBoardDisabled}
            onCellClick={handleCellClick}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-theme" suppressHydrationWarning>
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[var(--muted)] gap-1">
          <div>TIC-TAC-TOE &bull; MONOCHROME EDITION</div>
          <div>CLIENT-SIDE MINIMAX &bull; 2-PLAYER LOCAL</div>
        </div>
      </footer>

      {/* Result Dialog Modal */}
      <GameResultModal
        isOpen={showResultModal}
        gameStatus={gameStatus}
        winner={winningLine?.winner || null}
        gameMode={preferences.gameMode}
        onPlayAgain={restartMatch}
        onClose={closeResultModal}
      />
    </div>
  );
}
