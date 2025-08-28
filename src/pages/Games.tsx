import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { 
  Gamepad2, 
  Zap, 
  Brain, 
  Keyboard, 
  Timer, 
  Palette,
  Trophy,
  Target,
  Hash,
  Volume2,
  Circle,
  Shuffle
} from 'lucide-react';
import SearchBar from '../components/SearchBar';

const games = [
  {
    name: 'Snake Game',
    description: 'Classic snake game with smooth controls and score tracking',
    icon: Gamepad2,
    path: '/games/snake',
    color: 'bg-green-600',
    difficulty: 'Easy'
  },
  {
    name: 'Tetris',
    description: 'Block-stacking puzzle game with increasing difficulty',
    icon: Zap,
    path: '/games/tetris',
    color: 'bg-purple-600',
    difficulty: 'Medium'
  },
  {
    name: '2048',
    description: 'Slide numbered tiles to reach the 2048 tile',
    icon: Zap,
    path: '/games/2048',
    color: 'bg-orange-600',
    difficulty: 'Medium'
  },
  {
    name: 'Minesweeper',
    description: 'Classic mine detection puzzle game',
    icon: Target,
    path: '/games/minesweeper',
    color: 'bg-gray-600',
    difficulty: 'Hard'
  },
  {
    name: 'Tic Tac Toe',
    description: 'Classic X and O strategy game with AI opponent',
    icon: Hash,
    path: '/games/tic-tac-toe',
    color: 'bg-cyan-600',
    difficulty: 'Easy'
  },
  {
    name: 'Simon Says',
    description: 'Memory game with color and sound sequences',
    icon: Volume2,
    path: '/games/simon-says',
    color: 'bg-yellow-600',
    difficulty: 'Medium'
  },
  {
    name: 'Breakout',
    description: 'Break bricks with a bouncing ball and paddle',
    icon: Circle,
    path: '/games/breakout',
    color: 'bg-emerald-600',
    difficulty: 'Medium'
  },
  {
    name: 'Word Scramble',
    description: 'Unscramble letters to form words',
    icon: Shuffle,
    path: '/games/word-scramble',
    color: 'bg-violet-600',
    difficulty: 'Easy'
  },
  {
    name: 'Memory Game',
    description: 'Test your memory with card matching challenges',
    icon: Brain,
    path: '/games/memory',
    color: 'bg-blue-600',
    difficulty: 'Easy'
  },
  {
    name: 'Typing Test',
    description: 'Improve your typing speed and accuracy',
    icon: Keyboard,
    path: '/games/typing-test',
    color: 'bg-indigo-600',
    difficulty: 'Easy'
  },
  {
    name: 'Reaction Time',
    description: 'Test your reflexes and reaction speed',
    icon: Timer,
    path: '/games/reaction-time',
    color: 'bg-red-600',
    difficulty: 'Easy'
  },
  {
    name: 'Color Guess',
    description: 'Guess the color from RGB or HEX values',
    icon: Palette,
    path: '/games/color-guess',
    color: 'bg-pink-600',
    difficulty: 'Medium'
  }
];

export default function Games() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredGames, setFilteredGames] = React.useState(games);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.games-hero', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.game-card', 
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6, 
        stagger: 0.1,
        ease: 'power2.out'
      },
      '-=0.3'
    );
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredGames(games);
      return;
    }

    const filtered = games.filter(game =>
      game.name.toLowerCase().includes(query.toLowerCase()) ||
      game.description.toLowerCase().includes(query.toLowerCase()) ||
      game.difficulty.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredGames(filtered);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center games-hero mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
              <Gamepad2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Developer
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> Games</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Take a break from coding with 12 fun, interactive games. 
            Perfect for quick mental breaks, skill improvement, and entertainment.
          </p>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>12 Games</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>All Difficulties</span>
            </div>
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4" />
              <span>Instant Play</span>
            </div>
          </div>
          
          <div className="mt-8">
            <SearchBar onSearch={handleSearch} placeholder="Search games..." />
          </div>
        </div>

        {searchQuery && filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No games found for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game, index) => (
            <Link key={game.name} to={game.path} className="game-card group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full">
                <div className={`p-4 rounded-xl mb-6 w-fit ${game.color} group-hover:scale-110 transition-transform duration-300`}>
                  <game.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                  {game.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {game.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    game.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : game.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {game.difficulty}
                  </span>
                  
                  <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium group-hover:translate-x-2 transition-transform duration-200">
                    <span className="mr-2">Play Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Why Play Developer Games?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-3 bg-purple-600 rounded-lg w-fit mx-auto mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mental Break</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Take productive breaks that refresh your mind and improve focus
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-3 bg-pink-600 rounded-lg w-fit mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Skill Building</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Improve typing speed, reaction time, and problem-solving skills
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-3 bg-indigo-600 rounded-lg w-fit mx-auto mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Achievement</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Track your progress and compete with your personal best scores
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}