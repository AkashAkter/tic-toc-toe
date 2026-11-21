'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  BoardState,
  Difficulty,
  GameMode,
  GamePreferences,
  GameStatus,
  Player,
  ScoreState,
  StartingPlayerOption,
  ThemeMode,
  WinningLine,
} from '@/types/game';
import { checkWinner, isBoardFull } from '@/lib/gameLogic';
import { getComputerMove } from '@/lib/minimax';
import { sound } from '@/lib/sound';
import {
  DEFAULT_PREFERENCES,
  DEFAULT_SCORES,
  loadPreferences,
  loadScores,
  savePreferences,
  saveScores,
} from '@/lib/storage';

const INITIAL_BOARD: BoardState = Array(9).fill(null);

export function useTicTacToe() {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [turn, setTurn] = useState<Player>('X');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [winningLine, setWinningLine] = useState<WinningLine | null>(null);
  const [scores, setScores] = useState<ScoreState>(DEFAULT_SCORES);
  const [preferences, setPreferences] = useState<GamePreferences>(DEFAULT_PREFERENCES);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  const computerThinkingTimeout = useRef<NodeJS.Timeout | null>(null);

  const triggerVictoryConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#000000', '#ffffff', '#737373', '#a3a3a3'],
      });
    } catch {
      // ignore
    }
  }, []);

  /**
   * Finalize match outcome
   */
  const handleGameEnd = useCallback(
    (winnerResult: WinningLine | null, isDraw: boolean, currentMode: GameMode) => {
      if (computerThinkingTimeout.current) {
        clearTimeout(computerThinkingTimeout.current);
      }

      if (winnerResult) {
        setWinningLine(winnerResult);
        setGameStatus('won');
        sound.playWin();
        triggerVictoryConfetti();

        if (winnerResult.winner === 'X') {
          setScores((prev) => {
            const next = { ...prev, playerWins: prev.playerWins + 1 };
            saveScores(next);
            return next;
          });
        } else {
          if (currentMode === 'ai') {
            sound.playLoss();
          }
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

      setTimeout(() => {
        setShowResultModal(true);
      }, 350);
    },
    [triggerVictoryConfetti]
  );

  /**
   * Computer opening move
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
      }, 400);
    }, 50);
  }, []);

  /**
   * Computer move calculation
   */
  const executeComputerMove = useCallback(
    (currentBoard: BoardState, difficulty: Difficulty) => {
      setGameStatus('thinking');
      const delay = Math.floor(Math.random() * 200) + 350;

      computerThinkingTimeout.current = setTimeout(() => {
        const move = getComputerMove(currentBoard, difficulty, 'O', 'X');

        if (move !== -1 && currentBoard[move] === null) {
          const newBoard = [...currentBoard];
          newBoard[move] = 'O';
          sound.playMoveO();
          setBoard(newBoard);

          const win = checkWinner(newBoard);
          if (win) {
            handleGameEnd(win, false, 'ai');
          } else if (isBoardFull(newBoard)) {
            handleGameEnd(null, true, 'ai');
          } else {
            setTurn('X');
            setGameStatus('playing');
          }
        }
      }, delay);
    },
    [handleGameEnd]
  );

  // Initialize storage values on client mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const storedScores = loadScores();
      const storedPrefs = loadPreferences();
      setScores(storedScores);
      setPreferences(storedPrefs);
      sound.setSoundEnabled(storedPrefs.soundEnabled);

      if (storedPrefs.theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }

      if (storedPrefs.gameMode === 'ai' && storedPrefs.startingPlayer === 'computer') {
        triggerComputerOpening(storedPrefs.difficulty);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [triggerComputerOpening]);

  // Sync preferences and sound
  useEffect(() => {
    sound.setSoundEnabled(preferences.soundEnabled);
    savePreferences(preferences);

    if (preferences.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [preferences]);

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (computerThinkingTimeout.current) {
        clearTimeout(computerThinkingTimeout.current);
      }
    };
  }, []);

  /**
   * Handle user clicking cell
   */
  const handleCellClick = useCallback(
    (index: number) => {
      if (board[index] !== null || gameStatus !== 'playing') {
        return;
      }

      if (preferences.gameMode === 'ai' && turn !== 'X') {
        return;
      }

      const currentPiece = turn;
      const newBoard = [...board];
      newBoard[index] = currentPiece;

      if (currentPiece === 'X') {
        sound.playMoveX();
      } else {
        sound.playMoveO();
      }
      setBoard(newBoard);

      const win = checkWinner(newBoard);
      if (win) {
        handleGameEnd(win, false, preferences.gameMode);
        return;
      }

      if (isBoardFull(newBoard)) {
        handleGameEnd(null, true, preferences.gameMode);
        return;
      }

      if (preferences.gameMode === 'ai') {
        setTurn('O');
        executeComputerMove(newBoard, preferences.difficulty);
      } else {
        setTurn((prev) => (prev === 'X' ? 'O' : 'X'));
      }
    },
    [board, gameStatus, turn, preferences.gameMode, preferences.difficulty, executeComputerMove, handleGameEnd]
  );

  /**
   * Restarts current match
   */
  const restartMatch = useCallback(() => {
    if (computerThinkingTimeout.current) {
      clearTimeout(computerThinkingTimeout.current);
    }
    sound.playRestart();
    setBoard(INITIAL_BOARD);
    setWinningLine(null);
    setShowResultModal(false);

    if (preferences.gameMode === 'ai' && preferences.startingPlayer === 'computer') {
      triggerComputerOpening(preferences.difficulty);
    } else {
      setTurn('X');
      setGameStatus('playing');
    }
  }, [preferences.gameMode, preferences.startingPlayer, preferences.difficulty, triggerComputerOpening]);

  /**
   * Switch game mode (vs AI or 2-Player Local)
   */
  const setGameMode = useCallback(
    (gameMode: GameMode) => {
      sound.playClick();
      setPreferences((prev) => ({ ...prev, gameMode }));
      if (computerThinkingTimeout.current) {
        clearTimeout(computerThinkingTimeout.current);
      }
      setBoard(INITIAL_BOARD);
      setWinningLine(null);
      setShowResultModal(false);
      setTurn('X');
      setGameStatus('playing');
    },
    []
  );

  /**
   * Change difficulty
   */
  const setDifficulty = useCallback((difficulty: Difficulty) => {
    sound.playClick();
    setPreferences((prev) => ({ ...prev, difficulty }));
  }, []);

  /**
   * Change starting player
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

      if (preferences.gameMode === 'ai' && startingPlayer === 'computer') {
        triggerComputerOpening(preferences.difficulty);
      } else {
        setTurn('X');
        setGameStatus('playing');
      }
    },
    [preferences.gameMode, preferences.difficulty, triggerComputerOpening]
  );

  /**
   * Toggle sound
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
   * Toggle Theme
   */
  const toggleTheme = useCallback(() => {
    sound.playClick();
    setPreferences((prev) => {
      const nextTheme: ThemeMode = prev.theme === 'dark' ? 'light' : 'dark';
      return { ...prev, theme: nextTheme };
    });
  }, []);

  /**
   * Reset scores
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
    setGameMode,
    setDifficulty,
    setStartingPlayer,
    toggleSound,
    toggleTheme,
    closeResultModal,
  };
}
