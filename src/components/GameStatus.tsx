'use client';

import React from 'react';
import { GameMode, GameStatus as GameStatusType, Player, WinningLine } from '@/types/game';

interface GameStatusProps {
  status: GameStatusType;
  turn: Player;
  winningLine: WinningLine | null;
  gameMode: GameMode;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  status,
  turn,
  winningLine,
  gameMode,
}) => {
  let message = 'READY';

  if (status === 'thinking') {
    message = 'CPU THINKING...';
  } else if (status === 'playing') {
    if (gameMode === 'ai') {
      message = turn === 'X' ? 'YOUR TURN [X]' : 'CPU TURN [O]';
    } else {
      message = turn === 'X' ? 'PLAYER 1 [X]' : 'PLAYER 2 [O]';
    }
  } else if (status === 'won' && winningLine) {
    if (gameMode === 'ai') {
      message = winningLine.winner === 'X' ? 'YOU WIN!' : 'CPU WINS!';
    } else {
      message = winningLine.winner === 'X' ? 'P1 WINS!' : 'P2 WINS!';
    }
  } else if (status === 'draw') {
    message = 'STALEMATE: DRAW';
  }

  return (
    <div className="w-full font-mono text-xs">
      <div className="border border-theme py-2.5 px-3 bg-[var(--bg)] text-center font-bold tracking-wider uppercase text-[var(--fg)] flex items-center justify-between">
        <span className="text-[10px] text-[var(--muted)] font-normal tracking-normal">
          STATUS
        </span>
        <span className="tracking-widest text-xs">{message}</span>
        <span className="text-[10px] text-[var(--muted)]">
          {status === 'thinking' ? '[•••]' : '[●]'}
        </span>
      </div>
    </div>
  );
};
