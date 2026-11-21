'use client';

import React from 'react';
import { BoardState, WinningLine } from '@/types/game';
import { GameCell } from './GameCell';

interface GameBoardProps {
  board: BoardState;
  winningLine: WinningLine | null;
  isDisabled: boolean;
  onCellClick: (index: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  winningLine,
  isDisabled,
  onCellClick,
}) => {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] aspect-square mx-auto">
      {/* Outer Glow Halo */}
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 via-transparent to-orange-500/10 rounded-3xl blur-xl opacity-75 pointer-events-none" />

      {/* Main Arcade Board Container */}
      <div className="relative w-full h-full glass-panel rounded-3xl p-3 sm:p-4 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
        <div className="grid grid-cols-3 grid-rows-3 gap-2.5 sm:gap-3.5 w-full h-full">
          {board.map((cellValue, index) => {
            const isWinningCell = Boolean(
              winningLine?.pattern.includes(index as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8)
            );

            return (
              <GameCell
                key={`cell-${index}`}
                index={index}
                value={cellValue}
                isWinningCell={isWinningCell}
                winningPlayer={winningLine?.winner || null}
                isDisabled={isDisabled}
                onClick={() => onCellClick(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
