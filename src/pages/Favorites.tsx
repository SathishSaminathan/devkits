import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ToolCard from '../components/ToolCard';
import { toolCategories } from '../data/tools';
import { useFavorites } from '../contexts/FavoritesContext';

export default function Favorites() {
  const { favorites } = useFavorites();

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.favorites-hero', 
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

  // Get favorite tools from all categories
  const favoriteTools = toolCategories.flatMap(category => 
    category.tools.filter(tool => favorites.includes(tool.path))
  );

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center favorites-hero mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl">
              <Heart className="w-12 h-12 text-white fill-current" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600"> Favorites</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Quick access to your most-used development tools and utilities.
          </p>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 fill-current text-red-500" />
              <span>{favorites.length} Favorites</span>
            </div>
          </div>
        </div>

        {/* Favorites Grid */}
        {favoriteTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-8">
              <Heart className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Favorites Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                Start adding tools to your favorites by clicking the heart icon on any tool card.
              </p>
              <Link 
                to="/#tools"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200"
              >
                Browse Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteTools.map((tool, index) => (
              <ToolCard 
                key={tool.name}
                tool={tool}
                className="tool-card"
                delay={index * 0.1}
              />
            ))}
          </div>
        )}

        {/* Call to Action */}
        {favoriteTools.length > 0 && (
          <div className="text-center mt-20">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Discover More Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Explore our complete collection of developer tools and add more to your favorites.
              </p>
              <Link 
                to="/#tools"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200"
              >
                Browse All Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}