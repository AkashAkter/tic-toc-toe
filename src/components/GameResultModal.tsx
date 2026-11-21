'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStatus, Player } from '@/types/game';
import { Trophy, Bot, MinusCircle, RotateCw, X } from 'lucide-react';

interface GameResultModalProps {
  isOpen: boolean;
  gameStatus: GameStatus;
  winner: Player | null;
  onPlayAgain: () => void;
  onClose: () => void;
}

export const GameResultModal: React.FC<GameResultModalProps> = ({
  isOpen,
  gameStatus,
  winner,
  onPlayAgain,
  onClose,
}) => {
  if (!isOpen || (gameStatus !== 'won' && gameStatus !== 'draw')) {
    return null;
  }

  const isPlayerWin = gameStatus === 'won' && winner === 'X';
  const isComputerWin = gameStatus === 'won' && winner === 'O';
  const isDraw = gameStatus === 'draw';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className={`
            relative w-full max-w-sm rounded-3xl p-6 sm:p-7 text-center
            glass-panel border shadow-2xl overflow-hidden
            ${
              isPlayerWin
                ? 'border-cyan-400/50 shadow-[0_0_50px_rgba(0,240,255,0.25)]'
                : isComputerWin
                ? 'border-orange-500/50 shadow-[0_0_50px_rgba(255,119,0,0.25)]'
                : 'border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.25)]'
            }
          `}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Accent light glow behind icon */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full blur-3xl opacity-30 pointer-events-none ${
              isPlayerWin ? 'bg-cyan-400' : isComputerWin ? 'bg-orange-500' : 'bg-purple-500'
            }`}
          />

          {/* Animated Result Icon */}
          <div className="relative mb-4 flex justify-center">
            {isPlayerWin && (
              <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                <Trophy className="w-8 h-8" />
              </div>
            )}
            {isComputerWin && (
              <div className="w-16 h-16 rounded-2xl bg-orange-950/80 border border-orange-500/60 flex items-center justify-center text-orange-400 shadow-[0_0_25px_rgba(255,119,0,0.4)]">
                <Bot className="w-8 h-8" />
              </div>
            )}
            {isDraw && (
              <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-400/60 flex items-center justify-center text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                <MinusCircle className="w-8 h-8" />
              </div>
            )}
          </div>

          {/* Result Title */}
          <h2 className="text-2xl font-black tracking-tight mb-1">
            {isPlayerWin && (
              <span className="text-cyan-300 drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]">
                VICTORY!
              </span>
            )}
            {isComputerWin && (
              <span className="text-orange-400 drop-shadow-[0_0_12px_rgba(255,119,0,0.6)]">
                GAME OVER
              </span>
            )}
            {isDraw && (
              <span className="text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]">
                IT&apos;S A DRAW!
              </span>
            )}
          </h2>

          {/* Result Subtitle */}
          <p className="text-xs sm:text-sm text-slate-300/80 mb-6 font-medium">
            {isPlayerWin && 'Brilliant moves! You defeated the computer.'}
            {isComputerWin && 'The AI outplayed you this round. Ready for revenge?'}
            {isDraw && 'Equally matched! Neither side could break through.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={onPlayAgain}
              className={`
                w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2
                transition-all duration-200 cursor-pointer shadow-lg active:scale-98
                ${
                  isPlayerWin
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : isComputerWin
                    ? 'bg-orange-500 hover:bg-orange-400 text-black shadow-[0_0_20px_rgba(255,119,0,0.4)]'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                }
              `}
            >
              <RotateCw className="w-4 h-4" />
              <span>Play Again</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors cursor-pointer"
            >
              Review Board
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
