import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, Monitor, Gamepad2, Calculator } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '#', hasSubmenu: true },
    { name: 'Games', path: '#', hasSubmenu: true },
    { name: 'Calculators', path: '#', hasSubmenu: true },
  ];

  const toolsCategories = [
    {
      title: 'System Info',
      tools: [
        { name: 'Screen Resolution', path: '/screen-resolution' },
        { name: 'IP Address', path: '/ip-address' },
        { name: 'User Agent', path: '/user-agent' },
      ]
    },
    {
      title: 'Text & Data',
      tools: [
        { name: 'JSON Formatter', path: '/json-formatter' },
        { name: 'JWT Decoder', path: '/jwt-decoder' },
        { name: 'URL Encoder', path: '/url-encoder' },
        { name: 'Text Case', path: '/text-case' },
        { name: 'Hash Generator', path: '/hash-generator' },
        { name: 'Base64 Tools', path: '/base64-tools' },
      ]
    },
    {
      title: 'Generators',
      tools: [
        { name: 'UUID Generator', path: '/uuid-generator' },
        { name: 'Password Generator', path: '/password-generator' },
        { name: 'Lorem Generator', path: '/lorem-generator' },
        { name: 'QR Generator', path: '/qr-generator' },
      ]
    },
    {
      title: 'CSS & Design',
      tools: [
        { name: 'Color Tools', path: '/color-tools' },
        { name: 'CSS Generator', path: '/css-generator' },
        { name: 'CSS to Tailwind', path: '/css-to-tailwind' },
        { name: 'Image Optimizer', path: '/image-optimizer' },
      ]
    },
    {
      title: 'Code Tools',
      tools: [
        { name: 'Regex Tester', path: '/regex-tester' },
        { name: 'Markdown Preview', path: '/markdown-preview' },
        { name: 'Diff Checker', path: '/diff-checker' },
        { name: 'Code Beautifier', path: '/code-beautifier' },
      ]
    },
    {
      title: 'Utilities',
      tools: [
        { name: 'Time Tools', path: '/time-tools' },
        { name: 'Unit Converter', path: '/unit-converter' },
      ]
    }
  ];

  const games = [
    { name: 'Snake Game', path: '/games/snake' },
    { name: 'Tetris', path: '/games/tetris' },
    { name: 'Memory Game', path: '/games/memory' },
    { name: 'Typing Test', path: '/games/typing-test' },
    { name: 'Reaction Time', path: '/games/reaction-time' },
    { name: 'Color Guess', path: '/games/color-guess' },
    { name: '2048 Game', path: '/games/2048' },
    { name: 'Tic Tac Toe', path: '/games/tic-tac-toe' },
  ];

  const calculators = [
    { name: 'Basic Calculator', path: '/calculator/basic' },
    { name: 'Scientific Calculator', path: '/calculator/scientific' },
    { name: 'Loan Calculator', path: '/calculator/loan' },
    { name: 'SIP Calculator', path: '/calculator/sip' },
    { name: 'Mutual Fund Calculator', path: '/calculator/mutual-fund' },
  ];

  const handleSubmenuMouseEnter = (itemName: string) => {
    setHoveredItem(itemName);
  };

  const handleSubmenuMouseLeave = () => {
    setTimeout(() => {
      setHoveredItem(null);
    }, 150);
  };

  const handleLinkClick = () => {
    setHoveredItem(null);
    setIsMenuOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <Monitor className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">DevTools Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleSubmenuMouseEnter(item.name)}
                onMouseLeave={handleSubmenuMouseLeave}
              >
                {item.hasSubmenu ? (
                  <span className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Tools Submenu */}
                {hoveredItem === 'Tools' && item.name === 'Tools' && (
                  <div
                    className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                    onMouseEnter={() => handleSubmenuMouseEnter('Tools')}
                    onMouseLeave={handleSubmenuMouseLeave}
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Developer Tools</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Essential utilities for developers</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {toolsCategories.map((category) => (
                        <div key={category.title} className="p-2">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-3 py-2">
                            {category.title}
                          </h4>
                          {category.tools.map((tool) => (
                            <Link
                              key={tool.name}
                              to={tool.path}
                              className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200 hover:border-l-4 hover:border-blue-500"
                              onClick={handleLinkClick}
                            >
                              {tool.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Games Submenu */}
                {hoveredItem === 'Games' && item.name === 'Games' && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                    onMouseEnter={() => handleSubmenuMouseEnter('Games')}
                    onMouseLeave={handleSubmenuMouseLeave}
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Fun Games</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Take a break and play</p>
                    </div>
                    <div className="p-2">
                      {games.map((game) => (
                        <Link
                          key={game.name}
                          to={game.path}
                          className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition-all duration-200 hover:border-l-4 hover:border-purple-500"
                          onClick={handleLinkClick}
                        >
                          {game.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Calculators Submenu */}
                {hoveredItem === 'Calculators' && item.name === 'Calculators' && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                    onMouseEnter={() => handleSubmenuMouseEnter('Calculators')}
                    onMouseLeave={handleSubmenuMouseLeave}
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Calculators</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Mathematical tools</p>
                    </div>
                    <div className="p-2">
                      {calculators.map((calc) => (
                        <Link
                          key={calc.name}
                          to={calc.path}
                          className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 rounded-lg transition-all duration-200 hover:border-l-4 hover:border-green-500"
                          onClick={handleLinkClick}
                        >
                          {calc.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/favorites"
              className="relative flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
              onClick={handleLinkClick}
            >
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Home
              </Link>
              <Link
                to="/games"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={handleLinkClick}
              >
                <Gamepad2 className="h-5 w-5 mr-2" />
                Games
              </Link>
              <Link
                to="/calculator/basic"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={handleLinkClick}
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculators
              </Link>
              <Link
                to="/favorites"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={handleLinkClick}
              >
                <Heart className="h-5 w-5 mr-2" />
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleTheme}
                className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                {theme === 'dark' ? '☀️' : '🌙'} {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;