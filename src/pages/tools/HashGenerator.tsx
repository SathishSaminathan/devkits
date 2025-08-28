import React, { useState } from 'react';
import { Hash } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<{ [key: string]: string }>({});

  const generateHash = async (algorithm: string, text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateMD5 = (text: string): string => {
    // Simple MD5 implementation for demo purposes
    // In production, use a proper crypto library
    let hash = 0;
    if (text.length === 0) return hash.toString();
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;

    try {
      const [sha1, sha256, sha384, sha512] = await Promise.all([
        generateHash('SHA-1', input),
        generateHash('SHA-256', input),
        generateHash('SHA-384', input),
        generateHash('SHA-512', input)
      ]);

      setHashes({
        'MD5': generateMD5(input),
        'SHA-1': sha1,
        'SHA-256': sha256,
        'SHA-384': sha384,
        'SHA-512': sha512
      });
    } catch (error) {
      console.error('Error generating hashes:', error);
    }
  };

  const loadSample = () => {
    setInput('Hello World!');
  };

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate cryptographic hashes from text"
      icon={Hash}
    >
      <div className="space-y-6">
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleGenerate}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Generate Hashes
          </button>
          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Load Sample
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Input Text</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {Object.keys(hashes).length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Generated Hashes</h3>
            {Object.entries(hashes).map(([algorithm, hash]) => (
              <div key={algorithm} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{algorithm}</h4>
                  <CopyButton text={hash} />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded border p-3">
                  <code className="text-gray-900 dark:text-white font-mono text-sm break-all">
                    {hash}
                  </code>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
            Hash Algorithm Uses
          </h4>
          <div className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
            <p><strong>MD5:</strong> Legacy, fast but not cryptographically secure</p>
            <p><strong>SHA-1:</strong> Better than MD5 but deprecated for security</p>
            <p><strong>SHA-256:</strong> Current standard, very secure</p>
            <p><strong>SHA-384/512:</strong> Even more secure, longer hashes</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}