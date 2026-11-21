'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  BoardState,
  Difficulty,
  GamePreferences,
  GameStatus,
  Player,
  ScoreState,
  StartingPlayerOption,
  WinningLine,
} from '@/types/game';
import { checkWinner, isBoardFull } from '@/lib/gameLogic';
import { getComputerMove } from '@/lib/minimax';
import { sound } from '@/lib/sound';
import {
  DEFAULT_SCORES,
  loadPreferences,
  loadScores,
  savePreferences,
  saveScores,
} from '@/lib/storage';

const INITIAL_BOARD: BoardState = Array(9).fill(null);

export function useTicTacToe() {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [turn, setTurn] = useState<Player>('X'); // X is Player, O is Computer
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [winningLine, setWinningLine] = useState<WinningLine | null>(null);
  const [scores, setScores] = useState<ScoreState>(() => loadScores());
  const [preferences, setPreferences] = useState<GamePreferences>(() => loadPreferences());
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  const computerThinkingTimeout = useRef<NodeJS.Timeout | null>(null);

  const triggerVictoryConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ff7700', '#ffffff', '#38bdf8'],
      });
    } catch {
      // Confetti fallback safely ignored
    }
  }, []);

  /**
   * Helper to handle match finalization
   */
  const handleGameEnd = useCallback(
    (winnerResult: WinningLine | null, isDraw: boolean) => {
      if (computerThinkingTimeout.current) {
        clearTimeout(computerThinkingTimeout.current);
      }

      if (winnerResult) {
        setWinningLine(winnerResult);
        setGameStatus('won');

        if (winnerResult.winner === 'X') {
          // Human Win
          sound.playWin();
          triggerVictoryConfetti();
          setScores((prev) => {
            const next = { ...prev, playerWins: prev.playerWins + 1 };
            saveScores(next);
            return next;
          });
        } else {
          // Computer Win
          sound.playLoss();
          setScores((prev) => {
            const next = { ...prev, computerWins: prev.computerWins + 1 };
            saveScores(next);
            return next;
          });
        }
      } else if (isDraw) {
        setGameStatus('draw');
        sound.playDraw();
        setScores((prev) => {
          const next = { ...prev, draws: prev.draws + 1 };
          saveScores(next);
          return next;
        });
      }

      // Show result modal with a tiny delay for suspense
      setTimeout(() => {
        setShowResultModal(true);
      }, 550);
    },
    [triggerVictoryConfetti]
  );

  /**
   * Starts game when computer makes the opening move
   */
  const triggerComputerOpening = useCallback((difficulty: Difficulty) => {
    computerThinkingTimeout.current = setTimeout(() => {
      setTurn('O');
      setGameStatus('thinking');

      computerThinkingTimeout.current = setTimeout(() => {
        const move = getComputerMove(INITIAL_BOARD, difficulty, 'O', 'X');
        const newBoard = [...INITIAL_BOARD];
        newBoard[move] = 'O';
        sound.playMoveO();
        setBoard(newBoard);
        setTurn('X');
        setGameStatus('playing');
      }, 500);
    }, 50);
  }, []);

  /**
   * Triggers the computer move calculation with simulated thinking delay
   */
  const executeComputerMove = useCallback(
    (currentBoard: BoardState, difficulty: Difficulty) => {
      setGameStatus('thinking');

      // Random thinking time between 400ms and 650ms for realistic arcade responsiveness
      const delay = Math.floor(Math.random() * 250) + 400;

      computerThinkingTimeout.current = setTimeout(() => {
        const move = getComputerMove(currentBoard, difficulty, 'O', 'X');

        if (move !== -1 && currentBoard[move] === null) {
          const newBoard = [...currentBoard];
          newBoard[move] = 'O';
          sound.playMoveO();
          setBoard(newBoard);

          const win = checkWinner(newBoard);
          if (win) {
            handleGameEnd(win, false);
          } else if (isBoardFull(newBoard)) {
            handleGameEnd(null, true);
          } else {
            setTurn('X');
            setGameStatus('playing');
          }
        }
      }, delay);
    },
    [handleGameEnd]
  );

  // Initialize opening move if computer is configured to play first
  useEffect(() => {
    sound.setSoundEnabled(preferences.soundEnabled);
    if (preferences.startingPlayer === 'computer') {
      triggerComputerOpening(preferences.difficulty);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync preferences and sound
  useEffect(() => {
    sound.setSoundEnabled(preferences.soundEnabled);
    savePreferences(preferences);
  }, [preferences]);

  // Clean up any pending timeouts on unmount
  useEffect(() => {
    return () => {
      if (computerThinkingTimeout.current) {
        clearTimeout(computerThinkingTimeout.current);
      }
    };
  }, []);

  /**
   * Human player clicks a cell
   */
  const handleCellClick = useCallback(
    (index: number) => {
      // Ignore click if cell occupied, game over, or computer is thinking
      if (
        board[index] !== null ||
        gameStatus !== 'playing' ||
        turn !== 'X'
      ) {
        return;
      }

      const newBoard = [...board];
      newBoard[index] = 'X';
      sound.playMoveX();
      setBoard(newBoard);

      const win = checkWinner(newBoard);
      if (win) {
        handleGameEnd(win, false);
        return;
      }

      if (isBoardFull(newBoard)) {
        handleGameEnd(null, true);
        return;
      }

      // Switch to Computer's turn
      setTurn('O');
      executeComputerMove(newBoard, preferences.difficulty);
    },
    [board, gameStatus, turn, preferences.difficulty, executeComputerMove, handleGameEnd]
  );

  /**
   * Restarts the current match
   */
  const restartMatch = useCallback(() => {
    if (computerThinkingTimeout.current) {
      clearTimeout(computerThinkingTimeout.current);
    }
    sound.playRestart();
    setBoard(INITIAL_BOARD);
    setWinningLine(null);
    setShowResultModal(false);

    if (preferences.startingPlayer === 'computer') {
      triggerComputerOpening(preferences.difficulty);
    } else {
      setTurn('X');
      setGameStatus('playing');
    }
  }, [preferences.startingPlayer, preferences.difficulty, triggerComputerOpening]);

  /**
   * Change difficulty setting
   */
  const setDifficulty = useCallback((difficulty: Difficulty) => {
    sound.playClick();
    setPreferences((prev) => ({ ...prev, difficulty }));
  }, []);

  /**
   * Change starting player setting
   */
  const setStartingPlayer = useCallback(
    (startingPlayer: StartingPlayerOption) => {
      sound.playClick();
      setPreferences((prev) => ({ ...prev, startingPlayer }));

      if (computerThinkingTimeout.current) {
        clearTimeout(computerThinkingTimeout.current);
      }
      setBoard(INITIAL_BOARD);
      setWinningLine(null);
      setShowResultModal(false);
      if (startingPlayer === 'computer') {
        triggerComputerOpening(preferences.difficulty);
      } else {
        setTurn('X');
        setGameStatus('playing');
      }
    },
    [preferences.difficulty, triggerComputerOpening]
  );

  /**
   * Toggle sound effects
   */
  const toggleSound = useCallback(() => {
    setPreferences((prev) => {
      const nextVal = !prev.soundEnabled;
      sound.setSoundEnabled(nextVal);
      if (nextVal) {
        sound.playClick();
      }
      return { ...prev, soundEnabled: nextVal };
    });
  }, []);

  /**
   * Reset all persistent scores
   */
  const resetScores = useCallback(() => {
    sound.playRestart();
    setScores(DEFAULT_SCORES);
    saveScores(DEFAULT_SCORES);
  }, []);

  const closeResultModal = useCallback(() => {
    sound.playClick();
    setShowResultModal(false);
  }, []);

  return {
    board,
    turn,
    gameStatus,
    winningLine,
    scores,
    preferences,
    showResultModal,
    handleCellClick,
    restartMatch,
    resetScores,
    setDifficulty,
    setStartingPlayer,
    toggleSound,
    closeResultModal,
  };
}
