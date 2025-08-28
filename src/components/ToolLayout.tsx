import React, { ReactNode, useEffect } from 'react';
import { Link, ArrowLeft, Heart } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useFavorites } from '../contexts/FavoritesContext';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: React.ElementType;
  children: ReactNode;
}

export default function ToolLayout({ title, description, icon: Icon, children }: ToolLayoutProps) {
  const location = useLocation();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isToolFavorite = isFavorite(location.pathname);

  const handleFavoriteClick = () => {
    if (isToolFavorite) {
      removeFromFavorites(location.pathname);
    } else {
      addToFavorites(location.pathname);
    }
  };

  useEffect(() => {
    gsap.fromTo('.tool-content', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="tool-content">
          <RouterLink 
            to="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </RouterLink>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{title}</h1>
                  <p className="text-blue-100 mt-2">{description}</p>
                </div>
              </div>
                
                {/* Favorite button */}
                <button
                  onClick={handleFavoriteClick}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isToolFavorite 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  title={isToolFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`w-6 h-6 ${isToolFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            <div className="p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}