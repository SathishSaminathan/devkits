import React, { useState, useEffect } from 'react';
import { QrCode, Download } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

export default function QrGenerator() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState(200);

  const generateQR = () => {
    if (!text.trim()) return;
    
    // Using QR Server API for QR code generation
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
    setQrCodeUrl(url);
  };

  const downloadQR = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qr-code-${Date.now()}.png`;
    link.click();
  };

  const loadSample = () => {
    setText('https://example.com');
  };

  useEffect(() => {
    if (text.trim()) {
      const timeoutId = setTimeout(generateQR, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setQrCodeUrl('');
    }
  }, [text, size]);

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes for text, URLs, and data"
      icon={QrCode}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={generateQR}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Generate QR Code
          </button>
          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Load Sample URL
          </button>
          {qrCodeUrl && (
            <button
              onClick={downloadQR}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Text/URL to Encode</h3>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text, URL, or data to generate QR code..."
                className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                QR Code Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={150}>150x150</option>
                <option value={200}>200x200</option>
                <option value={300}>300x300</option>
                <option value={400}>400x400</option>
                <option value={500}>500x500</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Generated QR Code</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border text-center min-h-[300px] flex items-center justify-center">
              {qrCodeUrl ? (
                <img 
                  src={qrCodeUrl} 
                  alt="Generated QR Code"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  QR code will appear here when you enter text above
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              QR Code Uses
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Website URLs</li>
              <li>• Contact information</li>
              <li>• WiFi passwords</li>
              <li>• App download links</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
              Supported Formats
            </h4>
            <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
              <li>• Plain text</li>
              <li>• URLs and links</li>
              <li>• Email addresses</li>
              <li>• Phone numbers</li>
            </ul>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}