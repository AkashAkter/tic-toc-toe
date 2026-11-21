'use client';

import React from 'react';
import { Difficulty } from '@/types/game';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
  isDisabled: boolean;
}

const DIFFICULTIES: { id: Difficulty; label: string }[] = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'impossible', label: 'Impossible' },
];

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onChange,
  isDisabled,
}) => {
  return (
    <div className="w-full font-mono text-xs">
      <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-1.5">
        AI DIFFICULTY
      </div>
      <div className="grid grid-cols-3 border border-theme divide-x divide-theme bg-[var(--bg)]">
        {DIFFICULTIES.map((d) => {
          const isActive = difficulty === d.id;
          return (
            <button
              key={d.id}
              type="button"
              disabled={isDisabled}
              onClick={() => onChange(d.id)}
              className={`
                py-2 px-1 text-center text-xs font-mono uppercase tracking-wide cursor-pointer transition-colors
                ${
                  isActive
                    ? 'bg-[var(--active-bg)] text-[var(--active-fg)] font-bold'
                    : 'bg-[var(--bg)] text-[var(--fg)] hover:bg-[var(--hover-bg)]'
                }
                ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}
              `}
            >
              {isActive ? `• ${d.label}` : d.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
