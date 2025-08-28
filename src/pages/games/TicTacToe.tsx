import React, { useState, useEffect } from 'react';
import { Hash, RotateCcw, Play } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

type Player = 'X' | 'O' | null;
type GameMode = 'human' | 'ai';

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'tie' | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('ai');
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (board: Player[]): Player | 'tie' | null => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    
    if (board.every(cell => cell !== null)) {
      return 'tie';
    }
    
    return null;
  };

  const minimax = (board: Player[], depth: number, isMaximizing: boolean): number => {
    const result = checkWinner(board);
    
    if (result === 'O') return 10 - depth;
    if (result === 'X') return depth - 10;
    if (result === 'tie') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (board: Player[]): number => {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, 0, false);
        board[i] = null;
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    
    return bestMove;
  };

  const makeMove = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      setScores(prev => ({
        ...prev,
        [gameResult === 'tie' ? 'ties' : gameResult]: prev[gameResult === 'tie' ? 'ties' : gameResult] + 1
      }));
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 'O' && !winner) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove(board);
        if (bestMove !== -1) {
          makeMove(bestMove);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, board, winner, gameMode]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, ties: 0 });
  };

  return (
    <ToolLayout
      title="Tic Tac Toe"
      description="Classic X and O strategy game with AI opponent"
      icon={Hash}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">X Wins</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{scores.X}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">O Wins</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{scores.O}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Ties</p>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{scores.ties}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={gameMode}
              onChange={(e) => setGameMode(e.target.value as GameMode)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="ai">vs AI</option>
              <option value="human">vs Human</option>
            </select>
            
            <button
              onClick={resetGame}
              className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Play className="w-4 h-4" />
              <span>New Game</span>
            </button>
            
            <button
              onClick={resetScores}
              className="flex items-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Scores</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex justify-center">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-2" style={{ width: '300px', height: '300px' }}>
                {board.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => makeMove(index)}
                    disabled={!!cell || !!winner || (gameMode === 'ai' && currentPlayer === 'O')}
                    className={`
                      bg-white dark:bg-gray-800 rounded-lg text-4xl font-bold
                      hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200
                      disabled:cursor-not-allowed flex items-center justify-center
                      ${cell === 'X' ? 'text-blue-600' : cell === 'O' ? 'text-red-600' : 'text-gray-400'}
                      ${!cell && !winner && !(gameMode === 'ai' && currentPlayer === 'O') ? 'hover:scale-105 transform' : ''}
                    `}
                  >
                    {cell}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-80 space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Game Status</h3>
              {winner ? (
                <div className="text-center">
                  {winner === 'tie' ? (
                    <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                      It's a tie! 🤝
                    </p>
                  ) : (
                    <p className={`text-lg font-semibold ${
                      winner === 'X' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      Player {winner} wins! 🎉
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Current Turn:</p>
                  <p className={`text-2xl font-bold ${
                    currentPlayer === 'X' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    Player {currentPlayer}
                  </p>
                  {gameMode === 'ai' && currentPlayer === 'O' && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      AI is thinking...
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">How to Play</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                <li>• Click on empty squares to place your mark</li>
                <li>• Get 3 in a row (horizontal, vertical, or diagonal) to win</li>
                <li>• X always goes first</li>
                <li>• In AI mode, you play as X against the computer</li>
                <li>• In Human mode, take turns with another player</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-4">Game Modes</h3>
              <div className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <p><strong>vs AI:</strong> Play against an unbeatable AI opponent</p>
                <p><strong>vs Human:</strong> Play with a friend on the same device</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}