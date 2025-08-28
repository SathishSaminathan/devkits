import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function TimeTools() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timestampInput, setTimestampInput] = useState('');
  const [convertedDate, setConvertedDate] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [convertedTimestamp, setConvertedTimestamp] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTimestampToDate = () => {
    try {
      const timestamp = parseInt(timestampInput);
      const date = new Date(timestamp * (timestamp.toString().length === 10 ? 1000 : 1));
      setConvertedDate(date.toISOString());
    } catch (err) {
      setConvertedDate('Invalid timestamp');
    }
  };

  const handleDateToTimestamp = () => {
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) {
        setConvertedTimestamp('Invalid date');
        return;
      }
      setConvertedTimestamp(Math.floor(date.getTime() / 1000).toString());
    } catch (err) {
      setConvertedTimestamp('Invalid date');
    }
  };

  const loadCurrentTimestamp = () => {
    setTimestampInput(Math.floor(Date.now() / 1000).toString());
  };

  const loadCurrentDate = () => {
    setDateInput(new Date().toISOString().slice(0, 16));
  };

  const timeZones = [
    { name: 'UTC', offset: 'UTC+0' },
    { name: 'EST', offset: 'UTC-5' },
    { name: 'PST', offset: 'UTC-8' },
    { name: 'GMT', offset: 'UTC+0' },
    { name: 'JST', offset: 'UTC+9' },
    { name: 'CET', offset: 'UTC+1' }
  ];

  return (
    <ToolLayout
      title="Time Tools"
      description="Unix timestamp converter and timezone utilities"
      icon={Clock}
    >
      <div className="space-y-8">
        {/* Current Time */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="font-semibold mb-4">Current Time</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm opacity-80">Local Time</p>
              <p className="text-2xl font-mono">{currentTime.toLocaleTimeString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-80">Unix Timestamp</p>
              <div className="flex items-center justify-center space-x-2">
                <p className="text-xl font-mono">{Math.floor(currentTime.getTime() / 1000)}</p>
                <CopyButton text={Math.floor(currentTime.getTime() / 1000).toString()} className="bg-white/20 hover:bg-white/30" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-80">ISO String</p>
              <div className="flex items-center justify-center space-x-2">
                <p className="text-sm font-mono">{currentTime.toISOString().slice(0, 19)}</p>
                <CopyButton text={currentTime.toISOString()} className="bg-white/20 hover:bg-white/30" />
              </div>
            </div>
          </div>
        </div>

        {/* Timestamp to Date */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Timestamp to Date</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={timestampInput}
                  onChange={(e) => setTimestampInput(e.target.value)}
                  placeholder="Enter Unix timestamp..."
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={loadCurrentTimestamp}
                  className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
                >
                  Now
                </button>
              </div>
              <button
                onClick={handleTimestampToDate}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Convert to Date
              </button>
            </div>
            
            {convertedDate && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Converted Date</p>
                    <p className="font-mono text-gray-900 dark:text-white">{convertedDate}</p>
                  </div>
                  <CopyButton text={convertedDate} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date to Timestamp */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Date to Timestamp</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="flex gap-2 mb-3">
                <input
                  type="datetime-local"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={loadCurrentDate}
                  className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
                >
                  Now
                </button>
              </div>
              <button
                onClick={handleDateToTimestamp}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Convert to Timestamp
              </button>
            </div>
            
            {convertedTimestamp && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Unix Timestamp</p>
                    <p className="font-mono text-xl text-gray-900 dark:text-white">{convertedTimestamp}</p>
                  </div>
                  <CopyButton text={convertedTimestamp} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* World Clock */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">World Clock</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeZones.map((tz) => (
              <div key={tz.name} className="bg-white dark:bg-gray-800 rounded-lg p-4 border text-center">
                <h4 className="font-medium text-gray-900 dark:text-white">{tz.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tz.offset}</p>
                <p className="text-lg font-mono text-gray-800 dark:text-gray-200 mt-2">
                  {currentTime.toLocaleTimeString('en-US', { timeZone: tz.name === 'UTC' ? 'UTC' : undefined })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}