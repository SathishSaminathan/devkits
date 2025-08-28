import React, { useState, useEffect, useCallback } from 'react';
import { Gamepad2, RotateCcw, Play, Pause } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snake-high-score') || '0');
  });

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setIsPlaying(false);
  };

  const startGame = () => {
    if (gameOver) {
      resetGame();
    }
    setIsPlaying(true);
    setDirection({ x: 1, y: 0 });
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snake-high-score', newScore.toString());
          }
          return newScore;
        });
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPlaying, generateFood, highScore]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPlaying]);

  return (
    <ToolLayout
      title="Snake Game"
      description="Classic snake game with smooth controls and score tracking"
      icon={Gamepad2}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Score</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">High Score</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{highScore}</p>
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
                  gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                  width: '400px',
                  height: '400px'
                }}
              >
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                  const x = index % GRID_SIZE;
                  const y = Math.floor(index / GRID_SIZE);
                  
                  const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                  const isHead = snake[0]?.x === x && snake[0]?.y === y;
                  const isFood = food.x === x && food.y === y;
                  
                  return (
                    <div
                      key={index}
                      className={`w-full h-full rounded-sm ${
                        isFood 
                          ? 'bg-red-500' 
                          : isHead 
                          ? 'bg-green-400' 
                          : isSnake 
                          ? 'bg-green-600' 
                          : 'bg-gray-800'
                      }`}
                    />
                  );
                })}
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
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Game Rules</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                <li>• Use arrow keys to control the snake</li>
                <li>• Eat the red food to grow and score points</li>
                <li>• Avoid hitting walls or your own tail</li>
                <li>• Each food gives you 10 points</li>
                <li>• Try to beat your high score!</li>
              </ul>
            </div>

            {gameOver && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Game Over!</h3>
                <p className="text-red-800 dark:text-red-200 mb-4">
                  Final Score: {score}
                </p>
                {score === highScore && score > 0 && (
                  <p className="text-green-600 dark:text-green-400 font-semibold">
                    🎉 New High Score!
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