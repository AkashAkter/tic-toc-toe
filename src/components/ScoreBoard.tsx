'use client';

import React from 'react';
import { GameMode, ScoreState } from '@/types/game';

interface ScoreBoardProps {
  scores: ScoreState;
  gameMode: GameMode;
  onResetScores: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores, gameMode, onResetScores }) => {
  const p2Label = gameMode === 'ai' ? 'CPU (O)' : 'P2 (O)';

  return (
    <div className="w-full font-mono text-xs">
      <div className="flex justify-between items-center mb-1.5 text-[11px] uppercase tracking-wider text-[var(--muted)]">
        <span>SCORE</span>
        <button
          type="button"
          onClick={onResetScores}
          className="hover:underline cursor-pointer text-[10px]"
        >
          [reset]
        </button>
      </div>

      <div className="grid grid-cols-3 border border-theme divide-x divide-theme bg-[var(--bg)] text-center">
        <div className="py-2.5 px-2">
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
            {gameMode === 'ai' ? 'Player (X)' : 'P1 (X)'}
          </div>
          <div className="text-xl font-bold mt-0.5 text-[var(--fg)]">
            {scores.playerWins}
          </div>
        </div>

        <div className="py-2.5 px-2">
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
            Ties
          </div>
          <div className="text-xl font-bold mt-0.5 text-[var(--fg)]">
            {scores.draws}
          </div>
        </div>

        <div className="py-2.5 px-2">
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
            {p2Label}
          </div>
          <div className="text-xl font-bold mt-0.5 text-[var(--fg)]">
            {scores.computerWins}
          </div>
        </div>
      </div>
    </div>
  );
};
