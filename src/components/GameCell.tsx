'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  winningPlayer,
  isDisabled,
  onClick,
}) => {
  const isOccupied = value !== null;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled || isOccupied}
      aria-label={`Cell ${index + 1}, ${value ? `occupied by ${value}` : 'empty'}`}
      className={`
        relative aspect-square rounded-2xl flex items-center justify-center
        transition-all duration-300 select-none
        border backdrop-blur-md
        ${
          isWinningCell
            ? winningPlayer === 'X'
              ? 'cell-winning-x bg-cyan-950/40 border-cyan-400 z-10'
              : 'cell-winning-o bg-orange-950/40 border-orange-500 z-10'
            : 'bg-[#0c0d16]/70 border-white/10 hover:border-white/25 hover:bg-[#121422]/80'
        }
        ${
          !isOccupied && !isDisabled
            ? 'cursor-pointer active:scale-95 group shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,255,255,0.06)]'
            : 'cursor-default'
        }
        ${isDisabled && !isOccupied ? 'opacity-60 cursor-not-allowed' : ''}
      `}
    >
      {/* Subtle hover indicator for empty cells when it's player's turn */}
      {!isOccupied && !isDisabled && (
        <span className="opacity-0 group-hover:opacity-20 transition-opacity duration-200 text-cyan-400 font-black text-4xl pointer-events-none">
          ✕
        </span>
      )}

      {/* Render Mark with Smooth Framer Motion Entrance */}
      <AnimatePresence mode="wait">
        {value === 'X' && (
          <motion.div
            key="mark-x"
            initial={{ scale: 0.3, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 24,
            }}
            className="w-full h-full flex items-center justify-center p-3"
          >
            <svg
              viewBox="0 0 64 64"
              className="w-4/5 h-4/5 filter drop-shadow-[0_0_12px_rgba(0,240,255,0.85)]"
              stroke="#00f0ff"
              strokeWidth="10"
              strokeLinecap="round"
            >
              <line x1="12" y1="12" x2="52" y2="52" />
              <line x1="52" y1="12" x2="12" y2="52" />
            </svg>
          </motion.div>
        )}

        {value === 'O' && (
          <motion.div
            key="mark-o"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 24,
            }}
            className="w-full h-full flex items-center justify-center p-3"
          >
            <svg
              viewBox="0 0 64 64"
              className="w-4/5 h-4/5 filter drop-shadow-[0_0_12px_rgba(255,119,0,0.85)]"
            >
              <circle
                cx="32"
                cy="32"
                r="22"
                fill="none"
                stroke="#ff7700"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
