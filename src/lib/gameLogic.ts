import { BoardState, Player, WinningLine } from '@/types/game';

export const WINNING_COMBINATIONS: [number, number, number][] = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Checks if there is a winner on the board.
 * Returns the winning line (pattern and winner) or null.
 */
export function checkWinner(board: BoardState): WinningLine | null {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        pattern: combo,
        winner: board[a] as Player,
      };
    }
  }
  return null;
}

/**
 * Returns an array of indices that are currently empty (null).
 */
export function getAvailableMoves(board: BoardState): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

/**
 * Checks if the board is completely full.
 */
export function isBoardFull(board: BoardState): boolean {
  return board.every((cell) => cell !== null);
}

/**
 * Checks if the game has ended (either someone won or it is a draw).
 */
export function isGameOver(board: BoardState): boolean {
  return checkWinner(board) !== null || isBoardFull(board);
}
