import React from 'react';
import { Code, Heart } from 'lucide-react';
import GoldRate from './GoldRate';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20">
      {/* Gold Rate Bar */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-center">
          <GoldRate />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              DevKits
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
            Your ultimate collection of online development tools for developers, designers, and technical professionals.
          </p>
          
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for the developer community</span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 DevKits.in. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}