import React, { useState, useEffect } from 'react';
import { Palette, RotateCcw, Play } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

interface ColorChallenge {
  hex: string;
  rgb: { r: number; g: number; b: number };
  options: string[];
  correctAnswer: string;
}

export default function ColorGuess() {
  const [challenge, setChallenge] = useState<ColorChallenge | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [gameMode, setGameMode] = useState<'hex' | 'rgb'>('hex');
  const [streak, setStreak] = useState(0);

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    return { r, g, b, hex };
  };

  const generateOptions = (correctColor: any, mode: 'hex' | 'rgb') => {
    const options = [];
    const correctAnswer = mode === 'hex' ? correctColor.hex.toUpperCase() : `rgb(${correctColor.r}, ${correctColor.g}, ${correctColor.b})`;
    options.push(correctAnswer);

    // Generate 3 wrong options
    for (let i = 0; i < 3; i++) {
      let wrongOption;
      do {
        const wrongColor = generateRandomColor();
        wrongOption = mode === 'hex' ? wrongColor.hex.toUpperCase() : `rgb(${wrongColor.r}, ${wrongColor.g}, ${wrongColor.b})`;
      } while (options.includes(wrongOption));
      options.push(wrongOption);
    }

    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
  };

  const generateChallenge = () => {
    const color = generateRandomColor();
    const options = generateOptions(color, gameMode);
    const correctAnswer = gameMode === 'hex' ? color.hex.toUpperCase() : `rgb(${color.r}, ${color.g}, ${color.b})`;

    setChallenge({
      hex: color.hex,
      rgb: color,
      options,
      correctAnswer
    });
    setSelectedAnswer('');
    setShowResult(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    setTotalQuestions(prev => prev + 1);

    if (answer === challenge?.correctAnswer) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    generateChallenge();
  };

  const resetGame = () => {
    setScore(0);
    setTotalQuestions(0);
    setStreak(0);
    setChallenge(null);
    setSelectedAnswer('');
    setShowResult(false);
  };

  const getAccuracy = () => {
    if (totalQuestions === 0) return 0;
    return Math.round((score / totalQuestions) * 100);
  };

  const getScoreColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600 dark:text-green-400';
    if (accuracy >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  useEffect(() => {
    generateChallenge();
  }, [gameMode]);

  return (
    <ToolLayout
      title="Color Guess Game"
      description="Guess the color from RGB or HEX values"
      icon={Palette}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Score</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {score}/{totalQuestions}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
              <p className={`text-2xl font-bold ${getScoreColor(getAccuracy())}`}>
                {getAccuracy()}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Streak</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {streak}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={gameMode}
              onChange={(e) => setGameMode(e.target.value as 'hex' | 'rgb')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="hex">HEX Mode</option>
              <option value="rgb">RGB Mode</option>
            </select>
            
            <button
              onClick={resetGame}
              className="flex items-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {challenge && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  What color is this?
                </h2>
                <div 
                  className="w-64 h-64 mx-auto rounded-2xl shadow-2xl border-4 border-white dark:border-gray-700"
                  style={{ backgroundColor: challenge.hex }}
                ></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {challenge.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`
                      p-4 rounded-lg font-mono text-lg transition-all duration-200 transform hover:scale-105
                      ${showResult
                        ? option === challenge.correctAnswer
                          ? 'bg-green-500 text-white'
                          : option === selectedAnswer
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                      }
                      ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="text-center space-y-4">
                  <div className={`text-2xl font-bold ${
                    selectedAnswer === challenge.correctAnswer 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {selectedAnswer === challenge.correctAnswer ? '🎉 Correct!' : '❌ Wrong!'}
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-900 dark:text-white mb-2">
                      <strong>Correct Answer:</strong> {challenge.correctAnswer}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      HEX: {challenge.hex.toUpperCase()} | RGB: rgb({challenge.rgb.r}, {challenge.rgb.g}, {challenge.rgb.b})
                    </p>
                  </div>

                  <button
                    onClick={nextQuestion}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 mx-auto"
                  >
                    <Play className="w-4 h-4" />
                    <span>Next Question</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Game Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Questions:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Correct:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Wrong:</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">{totalQuestions - score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Best Streak:</span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">{streak}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">How to Play</h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                  <li>• Look at the colored square</li>
                  <li>• Choose the correct HEX or RGB value</li>
                  <li>• Try to build up your streak</li>
                  <li>• Switch between HEX and RGB modes</li>
                  <li>• Improve your color recognition skills!</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-4">Color Tips</h3>
                <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-2">
                  <li>• HEX uses 0-9 and A-F characters</li>
                  <li>• RGB values range from 0 to 255</li>
                  <li>• Higher values = brighter colors</li>
                  <li>• Equal RGB values = grayscale</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}