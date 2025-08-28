import React, { useState } from 'react';
import { GitCompare } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

export default function DiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [differences, setDifferences] = useState<any[]>([]);

  const calculateDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    const diffs = [];

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 !== line2) {
        diffs.push({
          lineNumber: i + 1,
          type: line1 && line2 ? 'modified' : line1 ? 'removed' : 'added',
          oldLine: line1,
          newLine: line2
        });
      } else if (line1 || line2) {
        diffs.push({
          lineNumber: i + 1,
          type: 'unchanged',
          oldLine: line1,
          newLine: line2
        });
      }
    }

    setDifferences(diffs);
  };

  const loadSample = () => {
    setText1(`function greet(name) {
  console.log("Hello " + name);
  return "Welcome!";
}

const user = "John";
greet(user);`);

    setText2(`function greet(name) {
  console.log(\`Hello \${name}!\`);
  return "Welcome to our app!";
}

const user = "Jane";
const message = greet(user);
console.log(message);`);
  };

  const getLineClass = (type: string) => {
    switch (type) {
      case 'added': return 'bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500';
      case 'removed': return 'bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500';
      case 'modified': return 'bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500';
      default: return 'bg-gray-50 dark:bg-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'added': return '+';
      case 'removed': return '-';
      case 'modified': return '~';
      default: return ' ';
    }
  };

  return (
    <ToolLayout
      title="Diff Checker"
      description="Compare two text files and highlight differences"
      icon={GitCompare}
    >
      <div className="space-y-6">
        <div className="flex gap-3 mb-6">
          <button
            onClick={calculateDiff}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Compare Texts
          </button>
          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Load Sample
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Original Text</h3>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Enter original text here..."
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Modified Text</h3>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Enter modified text here..."
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {differences.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Differences</h3>
            
            <div className="mb-4 flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Added</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Removed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Modified</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border max-h-96 overflow-auto">
              {differences.map((diff, index) => (
                <div key={index} className={`p-3 ${getLineClass(diff.type)}`}>
                  <div className="flex items-start space-x-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-8 flex-shrink-0">
                      {diff.lineNumber}
                    </span>
                    <span className="text-xs font-mono w-4 flex-shrink-0">
                      {getTypeIcon(diff.type)}
                    </span>
                    <div className="flex-1 font-mono text-sm">
                      {diff.type === 'modified' ? (
                        <div className="space-y-1">
                          <div className="text-red-700 dark:text-red-300">
                            - {diff.oldLine}
                          </div>
                          <div className="text-green-700 dark:text-green-300">
                            + {diff.newLine}
                          </div>
                        </div>
                      ) : diff.type === 'removed' ? (
                        <div className="text-red-700 dark:text-red-300">
                          - {diff.oldLine}
                        </div>
                      ) : diff.type === 'added' ? (
                        <div className="text-green-700 dark:text-green-300">
                          + {diff.newLine}
                        </div>
                      ) : (
                        <div className="text-gray-700 dark:text-gray-300">
                          {diff.oldLine}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {differences.filter(d => d.type === 'added').length} additions, {' '}
              {differences.filter(d => d.type === 'removed').length} deletions, {' '}
              {differences.filter(d => d.type === 'modified').length} modifications
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}