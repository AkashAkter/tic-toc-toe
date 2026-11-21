'use client';

import React from 'react';
import { GameStatus as GameStatusType, Player, WinningLine } from '@/types/game';
import { Loader2 } from 'lucide-react';

interface GameStatusProps {
  status: GameStatusType;
  turn: Player;
  winningLine: WinningLine | null;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  status,
  turn,
  winningLine,
}) => {
  return (
    <div className="flex items-center justify-center min-h-[44px]">
      {status === 'thinking' && (
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-orange-950/40 border border-orange-500/40 text-orange-400 shadow-[0_0_15px_rgba(255,119,0,0.2)] animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
          <span className="text-sm font-semibold tracking-wide">Computer thinking...</span>
        </div>
      )}

      {status === 'playing' && turn === 'X' && (
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
          </span>
          <span className="text-sm font-semibold tracking-wide">Your Turn (X)</span>
        </div>
      )}

      {status === 'won' && winningLine && (
        <div
          className={`flex items-center gap-2 px-5 py-1.5 rounded-full border text-sm font-bold tracking-wide shadow-lg ${
            winningLine.winner === 'X'
              ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
              : 'bg-orange-950/60 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(255,119,0,0.4)]'
          }`}
        >
          <span>{winningLine.winner === 'X' ? '🎉 You Win!' : '🤖 Computer Wins!'}</span>
        </div>
      )}

      {status === 'draw' && (
        <div className="flex items-center gap-2 px-5 py-1.5 rounded-full bg-purple-950/50 border border-purple-400 text-purple-300 text-sm font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <span>🤝 It&apos;s a Draw!</span>
        </div>
      )}
    </div>
  );
};
