'use client';

import React from 'react';
import { ScoreState } from '@/types/game';
import { RotateCcw } from 'lucide-react';

interface ScoreBoardProps {
  scores: ScoreState;
  onResetScores: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores, onResetScores }) => {
  return (
    <div className="w-full max-w-[420px] mx-auto flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {/* Player X Score Card */}
        <div className="glass-panel rounded-2xl p-2.5 sm:p-3 text-center border-t-2 border-t-cyan-400 relative overflow-hidden group">
          <div className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-cyan-400/80 mb-0.5">
            Player (X)
          </div>
          <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono tracking-tight drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
            {scores.playerWins}
          </div>
        </div>

        {/* Ties Score Card */}
        <div className="glass-panel rounded-2xl p-2.5 sm:p-3 text-center border-t-2 border-t-purple-400 relative overflow-hidden group">
          <div className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-purple-400/80 mb-0.5">
            Ties
          </div>
          <div className="text-xl sm:text-2xl font-black text-purple-300 font-mono tracking-tight drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
            {scores.draws}
          </div>
        </div>

        {/* Computer O Score Card */}
        <div className="glass-panel rounded-2xl p-2.5 sm:p-3 text-center border-t-2 border-t-orange-500 relative overflow-hidden group">
          <div className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-orange-400/80 mb-0.5">
            CPU (O)
          </div>
          <div className="text-xl sm:text-2xl font-black text-orange-400 font-mono tracking-tight drop-shadow-[0_0_8px_rgba(255,119,0,0.4)]">
            {scores.computerWins}
          </div>
        </div>
      </div>

      {/* Subtle Reset Scores Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onResetScores}
          className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer"
          title="Reset score counts"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset scores</span>
        </button>
      </div>
    </div>
  );
};
