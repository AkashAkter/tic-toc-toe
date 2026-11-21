'use client';

import React from 'react';
import { CellValue, Player } from '@/types/game';

interface GameCellProps {
  index: number;
  value: CellValue;
  isWinningCell: boolean;
  winningPlayer: Player | null;
  isDisabled: boolean;
  onClick: () => void;
}

export const GameCell: React.FC<GameCellProps> = ({
  index,
  value,
  isWinningCell,
  isDisabled,
  onClick,
}) => {
  const isOccupied = value !== null;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled || isOccupied}
      aria-label={`Cell ${index + 1}, ${value ? `marked ${value}` : 'empty'}`}
      className={`
        relative aspect-square w-full flex items-center justify-center
        border border-theme select-none font-mono transition-colors duration-100
        ${
          isWinningCell
            ? 'bg-[var(--active-bg)] text-[var(--active-fg)] font-black'
            : 'bg-[var(--bg)] text-[var(--fg)] hover-theme'
        }
        ${
          !isOccupied && !isDisabled
            ? 'cursor-pointer hover:bg-[var(--hover-bg)]'
            : 'cursor-default'
        }
        ${isDisabled && !isOccupied ? 'cursor-not-allowed opacity-40' : ''}
      `}
    >
      {value === 'X' && (
        <svg
          viewBox="0 0 48 48"
          className="w-3/5 h-3/5 stroke-current"
          strokeWidth="3.5"
          strokeLinecap="square"
        >
          <line x1="10" y1="10" x2="38" y2="38" />
          <line x1="38" y1="10" x2="10" y2="38" />
        </svg>
      )}

      {value === 'O' && (
        <svg
          viewBox="0 0 48 48"
          className="w-3/5 h-3/5 stroke-current"
          fill="none"
          strokeWidth="3.5"
        >
          <circle cx="24" cy="24" r="14" />
        </svg>
      )}
    </button>
  );
};
