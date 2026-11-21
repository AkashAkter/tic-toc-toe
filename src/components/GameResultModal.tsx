'use client';

import React from 'react';
import { GameMode, GameStatus, Player } from '@/types/game';

interface GameResultModalProps {
  isOpen: boolean;
  gameStatus: GameStatus;
  winner: Player | null;
  gameMode: GameMode;
  onPlayAgain: () => void;
  onClose: () => void;
}

export const GameResultModal: React.FC<GameResultModalProps> = ({
  isOpen,
  gameStatus,
  winner,
  gameMode,
  onPlayAgain,
  onClose,
}) => {
  if (!isOpen || (gameStatus !== 'won' && gameStatus !== 'draw')) {
    return null;
  }

  const isPlayerWin = gameStatus === 'won' && winner === 'X';
  const isDraw = gameStatus === 'draw';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
      <div className="w-full max-w-sm border-2 border-theme bg-[var(--bg)] p-5 font-mono text-[var(--fg)] rounded-none shadow-none">
        <div className="flex justify-between items-center border-b border-theme pb-2 mb-3 text-[11px] text-[var(--muted)]">
          <span>[ MATCH RESULT ]</span>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-[var(--fg)] cursor-pointer text-xs"
          >
            [✕]
          </button>
        </div>

        <div className="text-center my-4">
          <div className="text-2xl font-black tracking-tight mb-1 uppercase text-[var(--fg)]">
            {isDraw && 'DRAW!'}
            {!isDraw && gameMode === 'ai' && (isPlayerWin ? 'YOU WIN!' : 'CPU WINS!')}
            {!isDraw && gameMode === 'pvp' && (isPlayerWin ? 'PLAYER 1 WINS!' : 'PLAYER 2 WINS!')}
          </div>
          <p className="text-xs text-[var(--muted)]">
            {isDraw && 'Stalemate reached.'}
            {!isDraw && gameMode === 'ai' && (isPlayerWin ? 'Human outplayed the AI.' : 'Computer AI won.')}
            {!isDraw && gameMode === 'pvp' && (isPlayerWin ? 'Player 1 (X) takes the round.' : 'Player 2 (O) takes the round.')}
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full py-2 px-4 bg-[var(--active-bg)] text-[var(--active-fg)] font-bold text-xs uppercase tracking-wider hover:opacity-90 cursor-pointer border border-theme"
          >
            [ Play Again ]
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-1.5 px-4 bg-[var(--bg)] text-[var(--fg)] font-medium text-xs uppercase hover:bg-[var(--hover-bg)] cursor-pointer border border-theme"
          >
            [ Review Board ]
          </button>
        </div>
      </div>
    </div>
  );
};
