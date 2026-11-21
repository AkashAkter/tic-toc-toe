import { BoardState, Difficulty, Player } from '@/types/game';
import { checkWinner, getAvailableMoves, isBoardFull } from './gameLogic';

/**
 * Minimax recursive algorithm to calculate the best possible score for a move.
 * Maximizes for computer, minimizes for human.
 */
function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
  computerPlayer: Player,
  humanPlayer: Player
): number {
  const winningLine = checkWinner(board);

  if (winningLine) {
    if (winningLine.winner === computerPlayer) {
      return 10 - depth;
    } else {
      return depth - 10;
    }
  }

  if (isBoardFull(board)) {
    return 0;
  }

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of availableMoves) {
      board[move] = computerPlayer;
      const evaluation = minimax(board, depth + 1, false, computerPlayer, humanPlayer);
      board[move] = null;
      maxEval = Math.max(maxEval, evaluation);
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of availableMoves) {
      board[move] = humanPlayer;
      const evaluation = minimax(board, depth + 1, true, computerPlayer, humanPlayer);
      board[move] = null;
      minEval = Math.min(minEval, evaluation);
    }
    return minEval;
  }
}

/**
 * Finds the mathematically unbeatable move using the Minimax algorithm.
 */
export function getImpossibleMove(
  board: BoardState,
  computerPlayer: Player,
  humanPlayer: Player
): number {
  const availableMoves = getAvailableMoves(board);

  // If computer plays first on an empty board, take center or corner randomly for variety
  if (availableMoves.length === 9) {
    const openingMoves = [0, 2, 4, 6, 8];
    return openingMoves[Math.floor(Math.random() * openingMoves.length)];
  }

  let bestScore = -Infinity;
  let bestMoves: number[] = [];

  for (const move of availableMoves) {
    board[move] = computerPlayer;
    const score = minimax(board, 0, false, computerPlayer, humanPlayer);
    board[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMoves = [move];
    } else if (score === bestScore) {
      bestMoves.push(move);
    }
  }

  // Pick randomly among moves with the equal best score to keep play varied
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

/**
 * Finds an immediate winning move or a move to block the opponent.
 */
function findWinningOrBlockingMove(board: BoardState, targetPlayer: Player): number | null {
  const availableMoves = getAvailableMoves(board);
  for (const move of availableMoves) {
    board[move] = targetPlayer;
    const win = checkWinner(board);
    board[move] = null;
    if (win && win.winner === targetPlayer) {
      return move;
    }
  }
  return null;
}

/**
 * Medium difficulty:
 * 1. Checks if it can win immediately (100%).
 * 2. Blocks player's immediate win (85% of the time, 15% blunder).
 * 3. Chooses center if open (60%).
 * 4. Chooses corner if open.
 * 5. Otherwise random move.
 */
export function getMediumMove(
  board: BoardState,
  computerPlayer: Player,
  humanPlayer: Player
): number {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return -1;

  // 1. Can computer win right now?
  const winMove = findWinningOrBlockingMove(board, computerPlayer);
  if (winMove !== null) return winMove;

  // 2. Can player win right now? Block it most of the time
  const blockMove = findWinningOrBlockingMove(board, humanPlayer);
  if (blockMove !== null && Math.random() < 0.85) {
    return blockMove;
  }

  // 3. Take center if available
  if (board[4] === null && Math.random() < 0.6) {
    return 4;
  }

  // 4. Take available strategic corner
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
  if (corners.length > 0 && Math.random() < 0.5) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // 5. Fallback to random available move
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

/**
 * Easy difficulty:
 * Mostly random moves, with a 25% chance of blocking an obvious winning threat.
 */
export function getEasyMove(
  board: BoardState,
  _computerPlayer: Player,
  humanPlayer: Player
): number {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return -1;

  // 25% chance to notice and block a win
  if (Math.random() < 0.25) {
    const blockMove = findWinningOrBlockingMove(board, humanPlayer);
    if (blockMove !== null) return blockMove;
  }

  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

/**
 * Main dispatcher to get computer move according to selected difficulty.
 */
export function getComputerMove(
  board: BoardState,
  difficulty: Difficulty,
  computerPlayer: Player,
  humanPlayer: Player
): number {
  const copy = [...board];

  switch (difficulty) {
    case 'easy':
      return getEasyMove(copy, computerPlayer, humanPlayer);
    case 'medium':
      return getMediumMove(copy, computerPlayer, humanPlayer);
    case 'impossible':
    default:
      return getImpossibleMove(copy, computerPlayer, humanPlayer);
  }
}
