import { Difficulty, GameMode, GamePreferences, ScoreState, StartingPlayerOption, ThemeMode } from '@/types/game';

const SCORE_STORAGE_KEY = 'boring_tictactoe_scores';
const PREF_STORAGE_KEY = 'boring_tictactoe_prefs';

export const DEFAULT_SCORES: ScoreState = {
  playerWins: 0,
  computerWins: 0,
  draws: 0,
};

export const DEFAULT_PREFERENCES: GamePreferences = {
  gameMode: 'ai',
  difficulty: 'impossible',
  startingPlayer: 'player',
  soundEnabled: true,
  theme: 'dark',
};

export function loadScores(): ScoreState {
  if (typeof window === 'undefined') return DEFAULT_SCORES;
  try {
    const raw = localStorage.getItem(SCORE_STORAGE_KEY);
    if (!raw) return DEFAULT_SCORES;
    const parsed = JSON.parse(raw);
    return {
      playerWins: Number(parsed.playerWins) || 0,
      computerWins: Number(parsed.computerWins) || 0,
      draws: Number(parsed.draws) || 0,
    };
  } catch {
    return DEFAULT_SCORES;
  }
}

export function saveScores(scores: ScoreState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scores));
  } catch (err) {
    console.error('Failed to save scores to localStorage', err);
  }
}

export function loadPreferences(): GamePreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(PREF_STORAGE_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    return {
      gameMode: (parsed.gameMode === 'pvp' ? 'pvp' : 'ai') as GameMode,
      difficulty: (['easy', 'medium', 'impossible'].includes(parsed.difficulty)
        ? parsed.difficulty
        : 'impossible') as Difficulty,
      startingPlayer: (['player', 'computer'].includes(parsed.startingPlayer)
        ? parsed.startingPlayer
        : 'player') as StartingPlayerOption,
      soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : true,
      theme: (parsed.theme === 'light' ? 'light' : 'dark') as ThemeMode,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function savePreferences(prefs: GamePreferences): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PREF_STORAGE_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error('Failed to save preferences to localStorage', err);
  }
}
