'use client';

import React from 'react';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import { GameBoard } from '@/components/GameBoard';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameStatus } from '@/components/GameStatus';
import { DifficultySelector } from '@/components/DifficultySelector';
import { Controls } from '@/components/Controls';
import { GameResultModal } from '@/components/GameResultModal';
import { Gamepad2, Sparkles } from 'lucide-react';

export default function TicTacToePage() {
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
    setDifficulty,
    setStartingPlayer,
    toggleSound,
    closeResultModal,
  } = useTicTacToe();

  const isBoardDisabled = gameStatus === 'thinking' || gameStatus === 'won' || gameStatus === 'draw';

  return (
    <main className="min-h-screen bg-[#040407] bg-arcade-grid flex flex-col justify-between py-6 px-4 relative overflow-hidden select-none">
      {/* Subtle Ambient Background Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-orange-600/10 blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-md mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-semibold text-slate-400 mb-2.5 tracking-wider uppercase">
          <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Arcade Edition</span>
          <Sparkles className="w-3 h-3 text-orange-400 ml-0.5" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center justify-center gap-2">
          <span className="neon-text-x">TIC</span>
          <span className="text-slate-600 font-light">✕</span>
          <span className="text-slate-200">TAC</span>
          <span className="text-slate-600 font-light">○</span>
          <span className="neon-text-o">TOE</span>
        </h1>
        <p className="text-xs text-slate-400/80 mt-1">
          Player <span className="text-cyan-400 font-semibold">(X)</span> vs Computer <span className="text-orange-400 font-semibold">(O)</span>
        </p>
      </header>

      {/* Core Game Arena */}
      <div className="w-full max-w-md mx-auto my-auto flex flex-col gap-4 sm:gap-5">
        {/* Score Board */}
        <ScoreBoard scores={scores} onResetScores={resetScores} />

        {/* Difficulty Selector */}
        <DifficultySelector
          difficulty={preferences.difficulty}
          onChange={setDifficulty}
          isDisabled={gameStatus === 'thinking'}
        />

        {/* Controls Bar (First player, Sound, Restart) */}
        <Controls
          startingPlayer={preferences.startingPlayer}
          soundEnabled={preferences.soundEnabled}
          isDisabled={gameStatus === 'thinking'}
          onRestart={restartMatch}
          onToggleStartingPlayer={setStartingPlayer}
          onToggleSound={toggleSound}
        />

        {/* Dynamic Game Turn / Outcome Status */}
        <GameStatus
          status={gameStatus}
          turn={turn}
          winningLine={winningLine}
        />

        {/* Interactive 3x3 Game Board */}
        <GameBoard
          board={board}
          winningLine={winningLine}
          isDisabled={isBoardDisabled}
          onCellClick={handleCellClick}
        />
      </div>

      {/* Footer */}
      <footer className="w-full max-w-md mx-auto text-center pt-4">
        <div className="text-[11px] text-slate-500 font-mono">
          Pure Client-side Minimax AI &bull; Web Audio Synthesis
        </div>
      </footer>

      {/* Victory / Defeat / Draw Modal */}
      <GameResultModal
        isOpen={showResultModal}
        gameStatus={gameStatus}
        winner={winningLine?.winner || null}
        onPlayAgain={restartMatch}
        onClose={closeResultModal}
      />
    </main>
  );
}
