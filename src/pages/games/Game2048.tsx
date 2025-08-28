import React, { useState, useEffect, useCallback } from 'react';
import { Zap, RotateCcw, Play } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const GRID_SIZE = 4;

export default function Game2048() {
  const [board, setBoard] = useState<number[][]>(() => 
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
  );
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('2048-best-score') || '0');
  });
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const addRandomTile = useCallback((newBoard: number[][]) => {
    const emptyCells = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (newBoard[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }
    
    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
    
    return newBoard;
  }, []);

  const initializeGame = useCallback(() => {
    const newBoard = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setWon(false);
  }, [addRandomTile]);

  const moveLeft = (board: number[][]) => {
    const newBoard = board.map(row => [...row]);
    let moved = false;
    let scoreGain = 0;

    for (let i = 0; i < GRID_SIZE; i++) {
      const row = newBoard[i].filter(val => val !== 0);
      
      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          scoreGain += row[j];
          row[j + 1] = 0;
          if (row[j] === 2048 && !won) {
            setWon(true);
          }
        }
      }
      
      const filteredRow = row.filter(val => val !== 0);
      while (filteredRow.length < GRID_SIZE) {
        filteredRow.push(0);
      }
      
      if (JSON.stringify(newBoard[i]) !== JSON.stringify(filteredRow)) {
        moved = true;
      }
      newBoard[i] = filteredRow;
    }

    return { board: newBoard, moved, scoreGain };
  };

  const rotateBoard = (board: number[][]) => {
    const newBoard = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        newBoard[j][GRID_SIZE - 1 - i] = board[i][j];
      }
    }
    return newBoard;
  };

  const move = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver) return;

    let currentBoard = board.map(row => [...row]);
    let rotations = 0;

    switch (direction) {
      case 'right':
        rotations = 2;
        break;
      case 'up':
        rotations = 3;
        break;
      case 'down':
        rotations = 1;
        break;
    }

    for (let i = 0; i < rotations; i++) {
      currentBoard = rotateBoard(currentBoard);
    }

    const { board: movedBoard, moved, scoreGain } = moveLeft(currentBoard);

    for (let i = 0; i < (4 - rotations) % 4; i++) {
      currentBoard = rotateBoard(movedBoard);
    }

    if (moved) {
      addRandomTile(currentBoard);
      setBoard(currentBoard);
      setScore(prev => {
        const newScore = prev + scoreGain;
        if (newScore > bestScore) {
          setBestScore(newScore);
          localStorage.setItem('2048-best-score', newScore.toString());
        }
        return newScore;
      });

      // Check game over
      if (!canMove(currentBoard)) {
        setGameOver(true);
      }
    }
  }, [board, gameOver, bestScore, addRandomTile, won]);

  const canMove = (board: number[][]) => {
    // Check for empty cells
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (board[i][j] === 0) return true;
      }
    }

    // Check for possible merges
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const current = board[i][j];
        if (
          (i < GRID_SIZE - 1 && board[i + 1][j] === current) ||
          (j < GRID_SIZE - 1 && board[i][j + 1] === current)
        ) {
          return true;
        }
      }
    }

    return false;
  };

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          move('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          move('right');
          break;
        case 'ArrowUp':
          e.preventDefault();
          move('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          move('down');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [move]);

  const getTileColor = (value: number) => {
    const colors: { [key: number]: string } = {
      2: 'bg-gray-100 text-gray-800',
      4: 'bg-gray-200 text-gray-800',
      8: 'bg-orange-200 text-white',
      16: 'bg-orange-300 text-white',
      32: 'bg-orange-400 text-white',
      64: 'bg-orange-500 text-white',
      128: 'bg-yellow-300 text-white',
      256: 'bg-yellow-400 text-white',
      512: 'bg-yellow-500 text-white',
      1024: 'bg-yellow-600 text-white',
      2048: 'bg-red-500 text-white'
    };
    return colors[value] || 'bg-red-600 text-white';
  };

  return (
    <ToolLayout
      title="2048 Game"
      description="Slide numbered tiles to reach the 2048 tile"
      icon={Zap}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Score</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Best</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{bestScore}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={initializeGame}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Play className="w-4 h-4" />
              <span>New Game</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 inline-block">
              <div className="grid grid-cols-4 gap-2" style={{ width: '320px', height: '320px' }}>
                {board.flat().map((value, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center justify-center rounded-lg font-bold text-lg
                      ${value === 0 
                        ? 'bg-gray-300 dark:bg-gray-600' 
                        : getTileColor(value)
                      }
                      transition-all duration-200
                    `}
                  >
                    {value !== 0 && value}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-80 space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Controls</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Move Up</span>
                  <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm">↑</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Move Down</span>
                  <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm">↓</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Move Left</span>
                  <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm">←</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Move Right</span>
                  <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm">→</kbd>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">How to Play</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                <li>• Use arrow keys to move tiles</li>
                <li>• When two tiles with the same number touch, they merge</li>
                <li>• Try to reach the 2048 tile to win</li>
                <li>• Game ends when no moves are possible</li>
              </ul>
            </div>

            {won && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  🎉 You Won!
                </h3>
                <p className="text-green-800 dark:text-green-200">
                  You reached 2048! Keep playing for a higher score.
                </p>
              </div>
            )}

            {gameOver && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Game Over!</h3>
                <p className="text-red-800 dark:text-red-200 mb-4">
                  Final Score: {score}
                </p>
                {score === bestScore && score > 0 && (
                  <p className="text-green-600 dark:text-green-400 font-semibold">
                    🎉 New Best Score!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}