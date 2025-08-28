import React, { useState, useEffect, useCallback } from 'react';
import { Zap, RotateCcw, Play, Pause } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: 'bg-cyan-500' },
  O: { shape: [[1, 1], [1, 1]], color: 'bg-yellow-500' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'bg-purple-500' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'bg-green-500' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'bg-red-500' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: 'bg-blue-500' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: 'bg-orange-500' }
};

export default function TetrisGame() {
  const [board, setBoard] = useState(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<any>(null);
  const [nextPiece, setNextPiece] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const createPiece = useCallback(() => {
    const pieces = Object.keys(TETROMINOES);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    const piece = TETROMINOES[randomPiece as keyof typeof TETROMINOES];
    
    return {
      shape: piece.shape,
      color: piece.color,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2),
      y: 0
    };
  }, []);

  const isValidMove = useCallback((piece: any, newX: number, newY: number, newShape?: number[][]) => {
    const shape = newShape || piece.shape;
    
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardX = newX + x;
          const boardY = newY + y;
          
          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
            return false;
          }
          
          if (boardY >= 0 && board[boardY][boardX]) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  const rotatePiece = useCallback((shape: number[][]) => {
    const rotated = shape[0].map((_, index) =>
      shape.map(row => row[index]).reverse()
    );
    return rotated;
  }, []);

  const placePiece = useCallback(() => {
    if (!currentPiece) return;

    const newBoard = board.map(row => [...row]);
    
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.y + y;
          const boardX = currentPiece.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }

    // Check for completed lines
    const completedLines = [];
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell !== 0)) {
        completedLines.push(y);
      }
    }

    // Remove completed lines
    completedLines.forEach(lineIndex => {
      newBoard.splice(lineIndex, 1);
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    });

    if (completedLines.length > 0) {
      const points = [0, 40, 100, 300, 1200][completedLines.length] * level;
      setScore(prev => prev + points);
      setLines(prev => {
        const newLines = prev + completedLines.length;
        setLevel(Math.floor(newLines / 10) + 1);
        return newLines;
      });
    }

    setBoard(newBoard);
    setCurrentPiece(nextPiece);
    setNextPiece(createPiece());
  }, [currentPiece, board, nextPiece, createPiece, level]);

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!currentPiece || !isPlaying) return;

    const newX = currentPiece.x + dx;
    const newY = currentPiece.y + dy;

    if (isValidMove(currentPiece, newX, newY)) {
      setCurrentPiece(prev => ({ ...prev, x: newX, y: newY }));
    } else if (dy > 0) {
      // Piece can't move down, place it
      placePiece();
    }
  }, [currentPiece, isValidMove, placePiece, isPlaying]);

  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || !isPlaying) return;

    const rotatedShape = rotatePiece(currentPiece.shape);
    if (isValidMove(currentPiece, currentPiece.x, currentPiece.y, rotatedShape)) {
      setCurrentPiece(prev => ({ ...prev, shape: rotatedShape }));
    }
  }, [currentPiece, rotatePiece, isValidMove, isPlaying]);

  const startGame = () => {
    const newBoard = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
    setBoard(newBoard);
    setCurrentPiece(createPiece());
    setNextPiece(createPiece());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setGameOver(false);
    setCurrentPiece(null);
    setNextPiece(null);
  };

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const dropInterval = Math.max(50, 1000 - (level - 1) * 100);
    const interval = setInterval(() => {
      movePiece(0, 1);
    }, dropInterval);

    return () => clearInterval(interval);
  }, [movePiece, level, isPlaying, gameOver]);

  // Check game over
  useEffect(() => {
    if (currentPiece && !isValidMove(currentPiece, currentPiece.x, currentPiece.y)) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [currentPiece, isValidMove]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowLeft':
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          movePiece(0, 1);
          break;
        case 'ArrowUp':
        case ' ':
          rotatePieceHandler();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece, rotatePieceHandler, isPlaying]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // Add current piece to display board
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.y + y;
            const boardX = currentPiece.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard;
  };

  return (
    <ToolLayout
      title="Tetris"
      description="Block-stacking puzzle game with increasing difficulty"
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Level</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{level}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Lines</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{lines}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {!isPlaying ? (
              <button
                onClick={startGame}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Play className="w-4 h-4" />
                <span>{gameOver ? 'Play Again' : 'Start Game'}</span>
              </button>
            ) : (
              <button
                onClick={pauseGame}
                className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
            )}
            
            <button
              onClick={resetGame}
              className="flex items-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-gray-900 rounded-lg p-4 inline-block">
              <div 
                className="grid gap-1"
                style={{ 
                  gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
                  width: '300px',
                  height: '600px'
                }}
              >
                {renderBoard().flat().map((cell, index) => (
                  <div
                    key={index}
                    className={`w-full h-full border border-gray-700 ${
                      cell ? cell : 'bg-gray-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-80 space-y-6">
            {nextPiece && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Next Piece</h3>
                <div className="flex justify-center">
                  <div 
                    className="grid gap-1"
                    style={{ 
                      gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, 1fr)`,
                    }}
                  >
                    {nextPiece.shape.flat().map((cell: number, index: number) => (
                      <div
                        key={index}
                        className={`w-6 h-6 border border-gray-300 dark:border-gray-600 ${
                          cell ? nextPiece.color : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Controls</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Move Left</span>
                  <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm">←</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Move Right</span>
                  <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm">→</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Soft Drop</span>
                  <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm">↓</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Rotate</span>
                  <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm">↑ / Space</kbd>
                </div>
              </div>
            </div>

            {gameOver && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Game Over!</h3>
                <p className="text-red-800 dark:text-red-200 mb-2">
                  Final Score: {score}
                </p>
                <p className="text-red-800 dark:text-red-200">
                  Level: {level} | Lines: {lines}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}