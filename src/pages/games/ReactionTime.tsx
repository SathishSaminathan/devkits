import React, { useState, useEffect, useRef } from 'react';
import { Timer, RotateCcw, Play } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

type GameState = 'waiting' | 'ready' | 'go' | 'clicked' | 'too-early';

export default function ReactionTime() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setGameState('ready');
    setReactionTime(null);
    
    // Random delay between 2-5 seconds
    const delay = Math.random() * 3000 + 2000;
    
    timeoutRef.current = setTimeout(() => {
      setGameState('go');
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'ready') {
      // Clicked too early
      setGameState('too-early');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else if (gameState === 'go') {
      // Good click
      const endTime = Date.now();
      const reaction = endTime - (startTime || 0);
      setReactionTime(reaction);
      setAttempts(prev => [...prev, reaction]);
      setGameState('clicked');
    }
  };

  const resetTest = () => {
    setGameState('waiting');
    setReactionTime(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const clearHistory = () => {
    setAttempts([]);
  };

  const getAverageTime = () => {
    if (attempts.length === 0) return 0;
    return Math.round(attempts.reduce((sum, time) => sum + time, 0) / attempts.length);
  };

  const getBestTime = () => {
    if (attempts.length === 0) return 0;
    return Math.min(...attempts);
  };

  const getReactionRating = (time: number) => {
    if (time < 200) return { rating: 'Excellent', color: 'text-green-600 dark:text-green-400' };
    if (time < 250) return { rating: 'Good', color: 'text-blue-600 dark:text-blue-400' };
    if (time < 300) return { rating: 'Average', color: 'text-yellow-600 dark:text-yellow-400' };
    if (time < 400) return { rating: 'Below Average', color: 'text-orange-600 dark:text-orange-400' };
    return { rating: 'Slow', color: 'text-red-600 dark:text-red-400' };
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getBackgroundColor = () => {
    switch (gameState) {
      case 'ready': return 'bg-red-500';
      case 'go': return 'bg-green-500';
      case 'too-early': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getMessage = () => {
    switch (gameState) {
      case 'waiting': return 'Click "Start Test" to begin';
      case 'ready': return 'Wait for GREEN...';
      case 'go': return 'CLICK NOW!';
      case 'clicked': return `${reactionTime}ms`;
      case 'too-early': return 'Too early! Wait for green.';
      default: return '';
    }
  };

  return (
    <ToolLayout
      title="Reaction Time Test"
      description="Test your reflexes and reaction speed"
      icon={Timer}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Last Result</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {reactionTime ? `${reactionTime}ms` : '-'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Average</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {getAverageTime() ? `${getAverageTime()}ms` : '-'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Best</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {getBestTime() ? `${getBestTime()}ms` : '-'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Attempts</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {attempts.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {gameState === 'waiting' && (
              <button
                onClick={startTest}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Play className="w-4 h-4" />
                <span>Start Test</span>
              </button>
            )}
            
            <button
              onClick={resetTest}
              className="flex items-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>

            {attempts.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Clear History
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div
              onClick={handleClick}
              className={`
                w-full h-96 rounded-2xl cursor-pointer transition-all duration-200 transform hover:scale-105 active:scale-95
                ${getBackgroundColor()} flex items-center justify-center text-white text-4xl font-bold shadow-2xl
                ${gameState === 'go' ? 'animate-pulse' : ''}
              `}
            >
              {getMessage()}
            </div>
            
            {reactionTime && (
              <div className="mt-4 text-center">
                <p className={`text-2xl font-bold ${getReactionRating(reactionTime).color}`}>
                  {getReactionRating(reactionTime).rating}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">How to Play</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Click "Start Test" to begin</li>
                <li>• Wait for the screen to turn GREEN</li>
                <li>• Click as fast as possible when it's green</li>
                <li>• Don't click while it's red (too early!)</li>
                <li>• Try to get the fastest reaction time</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Reaction Time Scale</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-600 dark:text-green-400">Excellent:</span>
                  <span className="text-blue-800 dark:text-blue-200">&lt; 200ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600 dark:text-blue-400">Good:</span>
                  <span className="text-blue-800 dark:text-blue-200">200-250ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-600 dark:text-yellow-400">Average:</span>
                  <span className="text-blue-800 dark:text-blue-200">250-300ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-600 dark:text-orange-400">Below Avg:</span>
                  <span className="text-blue-800 dark:text-blue-200">300-400ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600 dark:text-red-400">Slow:</span>
                  <span className="text-blue-800 dark:text-blue-200">&gt; 400ms</span>
                </div>
              </div>
            </div>

            {attempts.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-4">
                  Recent Results
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {attempts.slice(-10).reverse().map((time, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-green-800 dark:text-green-200">
                        Attempt {attempts.length - index}:
                      </span>
                      <span className={`font-semibold ${getReactionRating(time).color}`}>
                        {time}ms
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}