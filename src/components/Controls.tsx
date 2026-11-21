'use client';

import React from 'react';
import { GameMode, StartingPlayerOption, ThemeMode } from '@/types/game';

interface ControlsProps {
  gameMode: GameMode;
  startingPlayer: StartingPlayerOption;
  soundEnabled: boolean;
  theme: ThemeMode;
  isDisabled: boolean;
  onRestart: () => void;
  onToggleGameMode: (mode: GameMode) => void;
  onToggleStartingPlayer: (player: StartingPlayerOption) => void;
  onToggleSound: () => void;
  onToggleTheme: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  gameMode,
  startingPlayer,
  soundEnabled,
  theme,
  isDisabled,
  onRestart,
  onToggleGameMode,
  onToggleStartingPlayer,
  onToggleSound,
  onToggleTheme,
}) => {
  return (
    <div className="w-full font-mono text-xs flex flex-col gap-3">
      {/* Game Mode */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-1.5">
          MODE
        </div>
        <div className="grid grid-cols-2 border border-theme divide-x divide-theme bg-[var(--bg)]">
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => onToggleGameMode('ai')}
            className={`py-2 px-2 text-center text-xs uppercase cursor-pointer transition-colors ${
              gameMode === 'ai'
                ? 'bg-[var(--active-bg)] text-[var(--active-fg)] font-bold'
                : 'hover:bg-[var(--hover-bg)] text-[var(--fg)]'
            }`}
          >
            {gameMode === 'ai' ? '• vs Computer' : 'vs Computer'}
          </button>

          <button
            type="button"
            disabled={isDisabled}
            onClick={() => onToggleGameMode('pvp')}
            className={`py-2 px-2 text-center text-xs uppercase cursor-pointer transition-colors ${
              gameMode === 'pvp'
                ? 'bg-[var(--active-bg)] text-[var(--active-fg)] font-bold'
                : 'hover:bg-[var(--hover-bg)] text-[var(--fg)]'
            }`}
          >
            {gameMode === 'pvp' ? '• 2 Players' : '2 Players'}
          </button>
        </div>
      </div>

      {/* Starting Turn (in AI mode) */}
      {gameMode === 'ai' && (
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-1.5">
            OPENING TURN
          </div>
          <div className="grid grid-cols-2 border border-theme divide-x divide-theme bg-[var(--bg)]">
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => onToggleStartingPlayer('player')}
              className={`py-1.5 px-2 text-center text-xs uppercase cursor-pointer transition-colors ${
                startingPlayer === 'player'
                  ? 'bg-[var(--active-bg)] text-[var(--active-fg)] font-bold'
                  : 'hover:bg-[var(--hover-bg)] text-[var(--fg)]'
              }`}
            >
              {startingPlayer === 'player' ? '• You First (X)' : 'You First (X)'}
            </button>

            <button
              type="button"
              disabled={isDisabled}
              onClick={() => onToggleStartingPlayer('computer')}
              className={`py-1.5 px-2 text-center text-xs uppercase cursor-pointer transition-colors ${
                startingPlayer === 'computer'
                  ? 'bg-[var(--active-bg)] text-[var(--active-fg)] font-bold'
                  : 'hover:bg-[var(--hover-bg)] text-[var(--fg)]'
              }`}
            >
              {startingPlayer === 'computer' ? '• CPU First (O)' : 'CPU First (O)'}
            </button>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="grid grid-cols-3 border border-theme divide-x divide-theme bg-[var(--bg)]">
        <button
          type="button"
          onClick={onRestart}
          className="py-2 px-1 text-center text-xs uppercase font-bold hover:bg-[var(--hover-bg)] text-[var(--fg)] cursor-pointer"
        >
          [Restart]
        </button>

        <button
          type="button"
          onClick={onToggleSound}
          className="py-2 px-1 text-center text-xs uppercase hover:bg-[var(--hover-bg)] text-[var(--fg)] cursor-pointer"
        >
          {soundEnabled ? '[Sound: On]' : '[Sound: Off]'}
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          className="py-2 px-1 text-center text-xs uppercase hover:bg-[var(--hover-bg)] text-[var(--fg)] cursor-pointer font-bold"
        >
          {theme === 'dark' ? '[☀ Light]' : '[☾ Dark]'}
        </button>
      </div>
    </div>
  );
};
