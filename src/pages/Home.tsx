import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Heart } from 'lucide-react';
import ToolCard from '../components/ToolCard';
import SearchBar from '../components/SearchBar';
import { toolCategories } from '../data/tools';
import { useFavorites } from '../contexts/FavoritesContext';

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredCategories, setFilteredCategories] = React.useState(toolCategories);
  const [showFavorites, setShowFavorites] = React.useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-content', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.tool-card', 
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
    setShowFavorites(false);
    
    if (!query.trim()) {
      setFilteredCategories(toolCategories);
      return;
    }

    const filtered = toolCategories.map(category => ({
      ...category,
      tools: category.tools.filter(tool =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
      )
    })).filter(category => category.tools.length > 0);

    setFilteredCategories(filtered);
  };

  const showFavoriteTools = () => {
    setShowFavorites(true);
    setSearchQuery('');
    
    if (favorites.length === 0) {
      setFilteredCategories([]);
      return;
    }

    const favoriteTools = toolCategories.map(category => ({
      ...category,
      tools: category.tools.filter(tool => favorites.includes(tool.path))
    })).filter(category => category.tools.length > 0);

    setFilteredCategories(favoriteTools);
  };

  const showAllTools = () => {
    setShowFavorites(false);
    setSearchQuery('');
    setFilteredCategories(toolCategories);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center hero-content">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
                <div className="relative p-4 bg-white dark:bg-gray-900 rounded-full">
                  <Sparkles className="w-12 h-12 text-blue-600" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">DevKits</span>
              <br />Essential Tools
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Your ultimate collection of online development utilities at DevKits.in. 
              Test, analyze, and generate values instantly without installing extra software.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#tools" 
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Explore Tools
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a 
                href="/games" 
                className="group inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🎮 Play Games
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              22+ Professional Tools
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Developer Tools Collection
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need for modern web development, organized by category
            </p>
            
            <div className="mt-8">
              <SearchBar onSearch={handleSearch} placeholder="Search tools..." />
              
              <div className="flex items-center justify-center space-x-4 mt-4">
                <button
                  onClick={showAllTools}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    !showFavorites 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  All Tools
                </button>
                <button
                  onClick={showFavoriteTools}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    showFavorites 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
                  <span>Favorites ({favorites.length})</span>
                </button>
              </div>
            </div>
          </div>

          {(searchQuery || showFavorites) && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {showFavorites 
                  ? "No favorite tools yet. Click the heart icon on any tool to add it to favorites!" 
                  : `No tools found for "${searchQuery}"`
                }
              </p>
            </div>
          )}

          {filteredCategories.map((category, categoryIndex) => (
            <div key={category.name} className="mb-16 fade-in-up">
              <div className="flex items-center mb-8 group">
                <div className="relative mr-4">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
                    {category.tools.length} tools
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <ToolCard 
                    key={tool.name}
                    tool={tool}
                    className="tool-card"
                    delay={toolIndex * 0.1}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Call to Action */}
          <div className="text-center mt-20 fade-in-up">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to boost your productivity?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Join thousands of developers who use DevKits daily for faster, more efficient development workflows.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="#tools" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Start Using Tools
                </a>
                <a 
                  href="/games" 
                  className="inline-flex items-center px-6 py-3 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Try Games →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}