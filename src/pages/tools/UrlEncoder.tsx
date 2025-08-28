import React, { useState } from 'react';
import { Link } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function UrlEncoder() {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  const handleEncode = () => {
    try {
      const result = encodeURIComponent(input);
      setEncoded(result);
    } catch (err) {
      setEncoded('Error encoding URL');
    }
  };

  const handleDecode = () => {
    try {
      const result = decodeURIComponent(input);
      setDecoded(result);
    } catch (err) {
      setDecoded('Error decoding URL');
    }
  };

  const loadSample = () => {
    setInput('https://example.com/search?q=hello world&category=tech');
  };

  return (
    <ToolLayout
      title="URL Encoder/Decoder"
      description="Encode and decode URLs and query parameters"
      icon={Link}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleEncode}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Encode URL
          </button>
          <button
            onClick={handleDecode}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Decode URL
          </button>
          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Load Sample
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Input Text/URL</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text or URL to encode/decode..."
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {encoded && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Encoded Result</h3>
              <CopyButton text={encoded} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <code className="text-gray-900 dark:text-white font-mono text-sm break-all">
                {encoded}
              </code>
            </div>
          </div>
        )}

        {decoded && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-900 dark:text-green-100">Decoded Result</h3>
              <CopyButton text={decoded} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <code className="text-gray-900 dark:text-white font-mono text-sm break-all">
                {decoded}
              </code>
            </div>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Common Use Cases
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Encoding spaces and special characters in URLs</li>
            <li>• Decoding URL parameters for analysis</li>
            <li>• Preparing text for use in query strings</li>
            <li>• Converting encoded URLs back to readable format</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}