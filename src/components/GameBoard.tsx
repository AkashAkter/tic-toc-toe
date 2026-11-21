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
    <div className="w-full max-w-[330px] sm:max-w-[360px] aspect-square mx-auto">
      {/* Sharp 3x3 Grid with 2px outer border and 1px internal lines */}
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full border-2 border-theme bg-[var(--border)] gap-[1.5px]">
        {board.map((cellValue, index) => {
          const isWinningCell = Boolean(
            winningLine?.pattern.includes(index as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8)
          );

          return (
            <GameCell
              key={`grid-cell-${index}`}
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
  );
};
