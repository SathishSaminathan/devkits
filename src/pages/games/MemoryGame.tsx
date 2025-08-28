import React, { useState, useEffect } from 'react';
import { Brain, RotateCcw, Play } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CARD_PAIRS = ['🎮', '🚀', '💎', '🎯', '🔥', '⚡', '🌟', '🎨'];

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const initializeGame = () => {
    const shuffledCards = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameStarted(false);
    setGameWon(false);
    setStartTime(null);
    setEndTime(null);
  };

  const startGame = () => {
    setGameStarted(true);
    setStartTime(Date.now());
  };

  const flipCard = (cardId: number) => {
    if (!gameStarted || flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard?.value === secondCard?.value) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true }
              : c
          ));
          setMatches(prev => {
            const newMatches = prev + 1;
            if (newMatches === CARD_PAIRS.length) {
              setGameWon(true);
              setEndTime(Date.now());
            }
            return newMatches;
          });
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const getGameTime = () => {
    if (!startTime) return 0;
    const end = endTime || Date.now();
    return Math.floor((end - startTime) / 1000);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <ToolLayout
      title="Memory Game"
      description="Test your memory with card matching challenges"
      icon={Brain}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Moves</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{moves}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Matches</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {matches}/{CARD_PAIRS.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {getGameTime()}s
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {!gameStarted ? (
              <button
                onClick={startGame}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Play className="w-4 h-4" />
                <span>Start Game</span>
              </button>
            ) : null}
            
            <button
              onClick={initializeGame}
              className="flex items-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Game</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => flipCard(card.id)}
                  className={`
                    aspect-square rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105
                    ${card.isFlipped || card.isMatched 
                      ? 'bg-white dark:bg-gray-700 shadow-lg' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                    }
                    ${card.isMatched ? 'ring-2 ring-green-500' : ''}
                    ${!gameStarted ? 'cursor-not-allowed opacity-50' : ''}
                  `}
                >
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    {card.isFlipped || card.isMatched ? card.value : '?'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-80 space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">How to Play</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Click cards to flip them over</li>
                <li>• Find matching pairs of cards</li>
                <li>• Match all pairs to win the game</li>
                <li>• Try to complete in fewer moves</li>
                <li>• Beat your best time!</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">Game Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-800 dark:text-blue-200">Cards Remaining:</span>
                  <span className="font-semibold text-blue-900 dark:text-blue-100">
                    {(CARD_PAIRS.length - matches) * 2}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800 dark:text-blue-200">Success Rate:</span>
                  <span className="font-semibold text-blue-900 dark:text-blue-100">
                    {moves > 0 ? Math.round((matches / moves) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>

            {gameWon && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  🎉 Congratulations!
                </h3>
                <p className="text-green-800 dark:text-green-200 mb-2">
                  You won in {moves} moves!
                </p>
                <p className="text-green-800 dark:text-green-200">
                  Time: {getGameTime()} seconds
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}