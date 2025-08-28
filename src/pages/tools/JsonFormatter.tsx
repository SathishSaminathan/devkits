import React, { useState } from 'react';
import { Code } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
      setIsValid(true);
    } catch (err) {
      setError('Invalid JSON format');
      setIsValid(false);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      setIsValid(true);
    } catch (err) {
      setError('Invalid JSON format');
      setIsValid(false);
      setOutput('');
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError('');
      setIsValid(true);
    } catch (err) {
      setError('Invalid JSON format');
      setIsValid(false);
    }
  };

  const sampleJson = {
    "name": "John Doe",
    "age": 30,
    "city": "New York",
    "skills": ["JavaScript", "React", "Node.js"],
    "isActive": true
  };

  const loadSample = () => {
    setInput(JSON.stringify(sampleJson, null, 2));
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate, and beautify JSON data"
      icon={Code}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={formatJson}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Format JSON
          </button>
          <button
            onClick={minifyJson}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Minify JSON
          </button>
          <button
            onClick={validateJson}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Validate Only
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
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Input JSON</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
            )}
            {isValid && !error && input && (
              <p className="text-green-600 dark:text-green-400 text-sm mt-2">✓ Valid JSON</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Output</h3>
              {output && <CopyButton text={output} />}
            </div>
            <div className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 overflow-auto">
              <pre className="text-gray-900 dark:text-white font-mono text-sm whitespace-pre-wrap">
                {output || 'Formatted JSON will appear here...'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}