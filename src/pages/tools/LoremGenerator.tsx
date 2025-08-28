import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function LoremGenerator() {
  const [output, setOutput] = useState('');
  const [type, setType] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs');
  const [count, setCount] = useState(3);

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateWords = (num: number) => {
    const words = [];
    for (let i = 0; i < num; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return words.join(' ');
  };

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 10) + 8;
    const sentence = generateWords(length);
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  const generateParagraph = () => {
    const sentences = [];
    const numSentences = Math.floor(Math.random() * 4) + 3;
    for (let i = 0; i < numSentences; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const generateLorem = () => {
    let result = '';
    
    switch (type) {
      case 'words':
        result = generateWords(count);
        break;
      case 'sentences':
        const sentences = [];
        for (let i = 0; i < count; i++) {
          sentences.push(generateSentence());
        }
        result = sentences.join(' ');
        break;
      case 'paragraphs':
        const paragraphs = [];
        for (let i = 0; i < count; i++) {
          paragraphs.push(generateParagraph());
        }
        result = paragraphs.join('\n\n');
        break;
    }
    
    setOutput(result);
  };

  const presets = [
    { name: '3 Paragraphs', type: 'paragraphs' as const, count: 3 },
    { name: '5 Sentences', type: 'sentences' as const, count: 5 },
    { name: '50 Words', type: 'words' as const, count: 50 },
    { name: '1 Paragraph', type: 'paragraphs' as const, count: 1 }
  ];

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for designs and mockups"
      icon={FileText}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Generate
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Count: {count}
              </label>
              <input
                type="range"
                min="1"
                max={type === 'words' ? 200 : type === 'sentences' ? 20 : 10}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            <button
              onClick={generateLorem}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Generate Lorem Ipsum
            </button>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Quick Presets</h4>
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setType(preset.type);
                    setCount(preset.count);
                  }}
                  className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            {output && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Generated Text</h3>
                  <CopyButton text={output} />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border max-h-96 overflow-auto">
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">
                    {output}
                  </p>
                </div>
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  {output.split(' ').length} words, {output.length} characters
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}