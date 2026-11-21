'use client';

import React from 'react';
import { RotateCw, Volume2, VolumeX, User, Bot } from 'lucide-react';
import { StartingPlayerOption } from '@/types/game';

interface ControlsProps {
  startingPlayer: StartingPlayerOption;
  soundEnabled: boolean;
  isDisabled: boolean;
  onRestart: () => void;
  onToggleStartingPlayer: (player: StartingPlayerOption) => void;
  onToggleSound: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  startingPlayer,
  soundEnabled,
  isDisabled,
  onRestart,
  onToggleStartingPlayer,
  onToggleSound,
}) => {
  return (
    <div className="w-full max-w-[420px] mx-auto flex items-center justify-between gap-2.5">
      {/* First Player Selector */}
      <div className="flex items-center p-1 rounded-xl glass-panel border border-white/10 text-xs">
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => onToggleStartingPlayer('player')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            startingPlayer === 'player'
              ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="You make the first move"
        >
          <User className="w-3.5 h-3.5" />
          <span>You First</span>
        </button>

        <button
          type="button"
          disabled={isDisabled}
          onClick={() => onToggleStartingPlayer('computer')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            startingPlayer === 'computer'
              ? 'bg-orange-950/60 text-orange-400 border border-orange-500/50 shadow-[0_0_10px_rgba(255,119,0,0.3)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Computer makes the first move"
        >
          <Bot className="w-3.5 h-3.5" />
          <span>CPU First</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        {/* Sound Effects Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          className={`p-2 rounded-xl glass-panel border border-white/10 transition-colors cursor-pointer ${
            soundEnabled
              ? 'text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/40'
              : 'text-slate-500 hover:text-slate-400'
          }`}
          title={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* Restart Match Button */}
        <button
          type="button"
          onClick={onRestart}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-600/80 to-blue-600/80 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer active:scale-95"
          title="Restart match"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Restart</span>
        </button>
      </div>
    </div>
  );
};
