import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [error, setError] = useState('');

  const result = useMemo(() => {
    if (!pattern || !testString) return null;

    try {
      const regex = new RegExp(pattern, flags);
      const matches = Array.from(testString.matchAll(regex));
      setError('');
      
      return {
        matches: matches.map((match, index) => ({
          index,
          match: match[0],
          start: match.index || 0,
          end: (match.index || 0) + match[0].length,
          groups: match.slice(1)
        })),
        isMatch: matches.length > 0
      };
    } catch (err) {
      setError('Invalid regular expression');
      return null;
    }
  }, [pattern, flags, testString]);

  const highlightMatches = (text: string, matches: any[]) => {
    if (!matches.length) return text;

    let highlighted = text;
    let offset = 0;

    matches.forEach((match, index) => {
      const start = match.start + offset;
      const end = match.end + offset;
      const before = highlighted.substring(0, start);
      const matchText = highlighted.substring(start, end);
      const after = highlighted.substring(end);
      
      highlighted = `${before}<span class="bg-yellow-300 dark:bg-yellow-600 px-1 rounded">${matchText}</span>${after}`;
      offset += 67; // Account for added HTML
    });

    return highlighted;
  };

  const loadEmailExample = () => {
    setPattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
    setTestString('Contact us at john@example.com or support@company.org for help.');
    setFlags('g');
  };

  const loadPhoneExample = () => {
    setPattern('\\(\\d{3}\\)\\s*\\d{3}-\\d{4}');
    setTestString('Call us at (555) 123-4567 or (800) 555-9999 for assistance.');
    setFlags('g');
  };

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test and validate regular expressions with live matching"
      icon={Search}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={loadEmailExample}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Email Example
          </button>
          <button
            onClick={loadPhoneExample}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Phone Example
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Regular Expression</h3>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter your regex pattern..."
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Flags</h3>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="gim"
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        )}

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Test String</h3>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against your regex..."
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {result && testString && pattern && (
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Test Result: {result.isMatch ? 
                  <span className="text-green-600">✓ Match Found</span> : 
                  <span className="text-red-600">✗ No Matches</span>
                }
              </h3>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <div 
                  className="text-gray-900 dark:text-white whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightMatches(testString, result.matches) 
                  }}
                />
              </div>
            </div>

            {result.matches.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-4">
                  Matches Found ({result.matches.length})
                </h3>
                <div className="space-y-2">
                  {result.matches.map((match) => (
                    <div key={match.index} className="bg-white dark:bg-gray-800 rounded p-3 border">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-sm text-gray-900 dark:text-white">
                            "{match.match}"
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            Position: {match.start}-{match.end}
                          </span>
                        </div>
                        <CopyButton text={match.match} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Common Regex Flags
          </h4>
          <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <p><strong>g</strong> - Global: Find all matches</p>
            <p><strong>i</strong> - Case insensitive: Ignore case</p>
            <p><strong>m</strong> - Multiline: ^ and $ match line breaks</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}