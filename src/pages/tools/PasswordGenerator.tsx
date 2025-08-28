import React, { useState } from 'react';
import { Shield, RefreshCw } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false
  });

  const generatePassword = () => {
    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (options.excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const getStrengthColor = () => {
    if (length < 8) return 'bg-red-500';
    if (length < 12) return 'bg-yellow-500';
    if (length < 16) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (length < 8) return 'Weak';
    if (length < 12) return 'Fair';
    if (length < 16) return 'Good';
    return 'Strong';
  };

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure passwords with customizable options"
      icon={Shield}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password Length: {length}
              </label>
              <input
                type="range"
                min="4"
                max="50"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>4</span>
                <span>50</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white">Options</h3>
              {Object.entries({
                uppercase: 'Uppercase Letters (A-Z)',
                lowercase: 'Lowercase Letters (a-z)',
                numbers: 'Numbers (0-9)',
                symbols: 'Symbols (!@#$%^&*)',
                excludeSimilar: 'Exclude Similar Characters (il1Lo0O)'
              }).map(([key, label]) => (
                <label key={key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={options[key as keyof typeof options]}
                    onChange={(e) => setOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                </label>
              ))}
            </div>

            <button
              onClick={generatePassword}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate Password</span>
            </button>
          </div>

          <div className="space-y-4">
            {password && (
              <>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Generated Password</h3>
                    <CopyButton text={password} />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                    <code className="text-lg font-mono text-gray-900 dark:text-white break-all">
                      {password}
                    </code>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Password Strength</h4>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${Math.min((length / 20) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${
                      getStrengthColor().replace('bg-', 'text-')
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
            Password Security Tips
          </h4>
          <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
            <li>• Use at least 12 characters for better security</li>
            <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
            <li>• Avoid using personal information or common words</li>
            <li>• Use a unique password for each account</li>
            <li>• Consider using a password manager</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}