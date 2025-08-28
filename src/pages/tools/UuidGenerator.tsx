import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  const copyAllUuids = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
  };

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate UUIDs and GUIDs in various formats"
      icon={Zap}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of UUIDs
            </label>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[1, 5, 10, 25, 50, 100].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={generateUUIDs}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Generate UUIDs
            </button>
            {uuids.length > 1 && (
              <button
                onClick={copyAllUuids}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Copy All
              </button>
            )}
          </div>
        </div>

        {uuids.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Generated UUIDs ({uuids.length})
            </h3>
            {uuids.map((uuid, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        #{index + 1}
                      </span>
                      <code className="text-lg font-mono text-gray-900 dark:text-white">
                        {uuid}
                      </code>
                    </div>
                  </div>
                  <CopyButton text={uuid} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              About UUIDs
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems. Version 4 UUIDs are randomly generated.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
              Common Uses
            </h4>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• Database primary keys</li>
              <li>• API request IDs</li>
              <li>• File naming</li>
              <li>• Session identifiers</li>
            </ul>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}