import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

interface Tool {
  name: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
}

interface ToolCardProps {
  tool: Tool;
  className?: string;
  delay?: number;
}

export default function ToolCard({ tool, className = '' }: ToolCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isToolFavorite = isFavorite(tool.path);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    
    if (isToolFavorite) {
      removeFromFavorites(tool.path);
    } else {
      addToFavorites(tool.path);
    }
  };

  return (
    <div className={`group ${className} relative`}>
      <Link to={tool.path} className="block">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full overflow-hidden group-hover:border-blue-300 dark:group-hover:border-blue-600">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <div className={`p-3 rounded-lg mb-4 w-fit ${tool.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <tool.icon className="w-6 h-6 text-white" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {tool.name}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
            {tool.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:translate-x-2 transition-transform duration-200">
              <span className="mr-2">Use Tool</span>
              <ArrowRight className="w-4 h-4 group-hover:animate-pulse" />
            </div>
            
            {/* Favorite indicator */}
            {isToolFavorite && (
              <div className="flex items-center space-x-1 text-red-500 text-xs">
                <Heart className="w-3 h-3 fill-current" />
                <span>Favorite</span>
              </div>
            )}
            
            {/* Free badge when not favorite */}
            {!isToolFavorite && (
              <div className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Free
              </div>
            )}
          </div>
        </div>
        </div>
      </Link>
      
      {/* Favorite button - positioned outside Link */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-200 ${
          isToolFavorite 
            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
        }`}
        title={isToolFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart className={`w-4 h-4 ${isToolFavorite ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
}