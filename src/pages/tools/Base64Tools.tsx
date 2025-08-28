import React, { useState } from 'react';
import { FileImage } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function Base64Tools() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      setError('');
    } catch (err) {
      setError('Error encoding to Base64');
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      setError('');
    } catch (err) {
      setError('Invalid Base64 string');
      setOutput('');
    }
  };

  const loadSample = () => {
    if (mode === 'encode') {
      setInput('Hello, World! This is a sample text for Base64 encoding.');
    } else {
      setInput('SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4=');
    }
  };

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode and decode Base64 text and data"
      icon={FileImage}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                mode === 'encode'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                mode === 'decode'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Decode
            </button>
          </div>
          
          <button
            onClick={mode === 'encode' ? handleEncode : handleDecode}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
          
          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Load Sample
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
          </h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter plain text to encode...' : 'Enter Base64 string to decode...'}
            className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>

        {output && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {mode === 'encode' ? 'Base64 Output' : 'Decoded Output'}
              </h3>
              <CopyButton text={output} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border max-h-60 overflow-auto">
              <code className="text-gray-900 dark:text-white font-mono text-sm whitespace-pre-wrap break-all">
                {output}
              </code>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              About Base64
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. 
              It's commonly used for encoding data in URLs, email, and data URIs.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
              Common Uses
            </h4>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• Embedding images in CSS/HTML</li>
              <li>• API authentication tokens</li>
              <li>• Email attachments</li>
              <li>• Data transfer in JSON</li>
            </ul>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}