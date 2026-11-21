export type Player = 'X' | 'O';

export type CellValue = Player | null;

export type BoardState = CellValue[];

export type GameMode = 'ai' | 'pvp';

export type Difficulty = 'easy' | 'medium' | 'impossible';

export type GameStatus = 'idle' | 'playing' | 'thinking' | 'won' | 'draw';

export interface ScoreState {
  playerWins: number;
  computerWins: number;
  draws: number;
}

export type StartingPlayerOption = 'player' | 'computer';

export type ThemeMode = 'light' | 'dark';

export interface GamePreferences {
  gameMode: GameMode;
  difficulty: Difficulty;
  startingPlayer: StartingPlayerOption;
  soundEnabled: boolean;
  theme: ThemeMode;
}

export interface WinningLine {
  pattern: [number, number, number];
  winner: Player;
}

export type MoveEvaluation = {
  index: number;
  score: number;
};
