'use client';

import React from 'react';
import { Difficulty } from '@/types/game';
import { Zap, ShieldAlert, Cpu } from 'lucide-react';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
  isDisabled: boolean;
}

const DIFFICULTIES: { id: Difficulty; label: string; icon: React.ReactNode; color: string }[] = [
  {
    id: 'easy',
    label: 'Easy',
    icon: <Zap className="w-3.5 h-3.5" />,
    color: 'hover:text-emerald-400 data-[active=true]:border-emerald-500 data-[active=true]:text-emerald-300 data-[active=true]:bg-emerald-950/40',
  },
  {
    id: 'medium',
    label: 'Medium',
    icon: <ShieldAlert className="w-3.5 h-3.5" />,
    color: 'hover:text-amber-400 data-[active=true]:border-amber-500 data-[active=true]:text-amber-300 data-[active=true]:bg-amber-950/40',
  },
  {
    id: 'impossible',
    label: 'Impossible',
    icon: <Cpu className="w-3.5 h-3.5" />,
    color: 'hover:text-rose-400 data-[active=true]:border-rose-500 data-[active=true]:text-rose-300 data-[active=true]:bg-rose-950/40',
  },
];

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onChange,
  isDisabled,
}) => {
  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div className="flex items-center justify-between p-1 rounded-2xl glass-panel border border-white/10">
        {DIFFICULTIES.map((d) => {
          const isActive = difficulty === d.id;
          return (
            <button
              key={d.id}
              type="button"
              disabled={isDisabled}
              data-active={isActive}
              onClick={() => onChange(d.id)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold
                transition-all duration-200 cursor-pointer select-none
                ${d.color}
                ${
                  isActive
                    ? 'border shadow-[0_0_12px_rgba(255,255,255,0.1)]'
                    : 'text-slate-400 hover:bg-white/5 border border-transparent'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {d.icon}
              <span>{d.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
