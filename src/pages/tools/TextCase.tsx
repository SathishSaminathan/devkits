import React, { useState } from 'react';
import { Type } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function TextCase() {
  const [input, setInput] = useState('');

  const transformations = [
    {
      name: 'UPPER CASE',
      transform: (text: string) => text.toUpperCase(),
      color: 'bg-red-600'
    },
    {
      name: 'lower case',
      transform: (text: string) => text.toLowerCase(),
      color: 'bg-blue-600'
    },
    {
      name: 'Title Case',
      transform: (text: string) => text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      ),
      color: 'bg-green-600'
    },
    {
      name: 'Sentence case',
      transform: (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
      color: 'bg-purple-600'
    },
    {
      name: 'camelCase',
      transform: (text: string) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      ).replace(/\s+/g, ''),
      color: 'bg-yellow-600'
    },
    {
      name: 'PascalCase',
      transform: (text: string) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
        word.toUpperCase()
      ).replace(/\s+/g, ''),
      color: 'bg-pink-600'
    },
    {
      name: 'snake_case',
      transform: (text: string) => text.toLowerCase().replace(/\s+/g, '_'),
      color: 'bg-indigo-600'
    },
    {
      name: 'kebab-case',
      transform: (text: string) => text.toLowerCase().replace(/\s+/g, '-'),
      color: 'bg-teal-600'
    }
  ];

  const loadSample = () => {
    setInput('Hello World This Is A Sample Text');
  };

  return (
    <ToolLayout
      title="Text Case Converter"
      description="Convert text between different cases and formats"
      icon={Type}
    >
      <div className="space-y-6">
        <div className="flex gap-3 mb-6">
          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Load Sample Text
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Input Text</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here to convert..."
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {transformations.map((transformation) => {
            const result = input ? transformation.transform(input) : '';
            return (
              <div key={transformation.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`px-2 py-1 ${transformation.color} text-white text-xs font-semibold rounded`}>
                    {transformation.name}
                  </div>
                  {result && <CopyButton text={result} />}
                </div>
                <div className="bg-white dark:bg-gray-800 rounded border min-h-[4rem] p-3">
                  <p className="text-gray-900 dark:text-white font-mono text-sm break-all">
                    {result || 'Converted text will appear here...'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Text Conversion Guide
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <p><strong>camelCase:</strong> First word lowercase, subsequent words capitalized</p>
              <p><strong>PascalCase:</strong> All words capitalized, no spaces</p>
            </div>
            <div>
              <p><strong>snake_case:</strong> All lowercase with underscores</p>
              <p><strong>kebab-case:</strong> All lowercase with hyphens</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}