import React, { useState } from 'react';
import { Key } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState('');

  const decodeJWT = (jwt: string) => {
    try {
      const parts = jwt.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      
      return { header, payload, signature: parts[2] };
    } catch (err) {
      throw new Error('Invalid JWT token');
    }
  };

  const handleDecode = () => {
    if (!token.trim()) {
      setError('Please enter a JWT token');
      return;
    }

    try {
      const result = decodeJWT(token);
      setDecoded(result);
      setError('');
    } catch (err) {
      setError('Invalid JWT token format');
      setDecoded(null);
    }
  };

  const loadSample = () => {
    const sampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    setToken(sampleToken);
  };

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode and analyze JWT tokens safely (client-side only)"
      icon={Key}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleDecode}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Decode JWT
          </button>
          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Load Sample Token
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">JWT Token</h3>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>

        {decoded && (
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Header</h3>
                <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <pre className="text-gray-900 dark:text-white font-mono text-sm whitespace-pre-wrap">
                  {JSON.stringify(decoded.header, null, 2)}
                </pre>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Payload</h3>
                <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <pre className="text-gray-900 dark:text-white font-mono text-sm whitespace-pre-wrap">
                  {JSON.stringify(decoded.payload, null, 2)}
                </pre>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                Security Notice
              </h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                JWT decoding is performed entirely in your browser. No tokens are sent to any server.
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}