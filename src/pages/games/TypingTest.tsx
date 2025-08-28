import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, RotateCcw, Play } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
  "Programming is not about what you know; it's about what you can figure out. Every expert was once a beginner.",
  "Code is like humor. When you have to explain it, it's bad. Clean code always looks like it was written by someone who cares.",
  "The best way to get a project done faster is to start sooner. Debugging is twice as hard as writing the code in the first place.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
];

export default function TypingTest() {
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const startTest = () => {
    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setCurrentText(randomText);
    setUserInput('');
    setCurrentIndex(0);
    setErrors(0);
    setStartTime(Date.now());
    setEndTime(null);
    setIsActive(true);
    inputRef.current?.focus();
  };

  const resetTest = () => {
    setCurrentText('');
    setUserInput('');
    setCurrentIndex(0);
    setErrors(0);
    setStartTime(null);
    setEndTime(null);
    setIsActive(false);
  };

  const handleInputChange = (value: string) => {
    if (!isActive) return;

    setUserInput(value);
    
    // Count errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
    setCurrentIndex(value.length);

    // Check if test is complete
    if (value.length === currentText.length) {
      setEndTime(Date.now());
      setIsActive(false);
    }
  };

  const getWPM = () => {
    if (!startTime || !endTime) return 0;
    const timeInMinutes = (endTime - startTime) / 60000;
    const wordsTyped = userInput.trim().split(' ').length;
    return Math.round(wordsTyped / timeInMinutes);
  };

  const getAccuracy = () => {
    if (userInput.length === 0) return 100;
    const correctChars = userInput.length - errors;
    return Math.round((correctChars / userInput.length) * 100);
  };

  const getElapsedTime = () => {
    if (!startTime) return 0;
    const end = endTime || Date.now();
    return Math.round((end - startTime) / 1000);
  };

  const renderText = () => {
    return currentText.split('').map((char, index) => {
      let className = 'text-gray-400 dark:text-gray-500';
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          className = 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
        } else {
          className = 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
        }
      } else if (index === currentIndex) {
        className = 'text-gray-900 dark:text-white bg-blue-200 dark:bg-blue-800 animate-pulse';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <ToolLayout
      title="Typing Test"
      description="Improve your typing speed and accuracy"
      icon={Keyboard}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">WPM</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {endTime ? getWPM() : 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {getAccuracy()}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {getElapsedTime()}s
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Errors</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {errors}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={startTest}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Play className="w-4 h-4" />
              <span>Start Test</span>
            </button>
            
            <button
              onClick={resetTest}
              className="flex items-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {currentText && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Text to Type</h3>
                <div className="text-lg leading-relaxed font-mono bg-white dark:bg-gray-800 p-4 rounded border min-h-[120px]">
                  {renderText()}
                </div>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Your Typing</h3>
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentText ? "Start typing here..." : "Click 'Start Test' to begin"}
                disabled={!isActive}
                className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Progress</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-800 dark:text-blue-200">Completion</span>
                    <span className="text-blue-900 dark:text-blue-100">
                      {currentText ? Math.round((userInput.length / currentText.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: currentText ? `${(userInput.length / currentText.length) * 100}%` : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p>Characters: {userInput.length} / {currentText.length}</p>
                  <p>Words: {userInput.trim().split(' ').filter(w => w).length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tips</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Keep your fingers on the home row</li>
                <li>• Don't look at the keyboard</li>
                <li>• Focus on accuracy over speed</li>
                <li>• Take breaks to avoid fatigue</li>
                <li>• Practice regularly to improve</li>
              </ul>
            </div>

            {endTime && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  Test Complete! 🎉
                </h3>
                <div className="space-y-1 text-green-800 dark:text-green-200">
                  <p>Speed: {getWPM()} WPM</p>
                  <p>Accuracy: {getAccuracy()}%</p>
                  <p>Time: {getElapsedTime()} seconds</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}