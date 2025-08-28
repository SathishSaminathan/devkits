import React, { useState, useCallback } from 'react';
import { Image as ImageIcon, Upload, Download } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

export default function ImageOptimizer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [optimizedImage, setOptimizedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [optimizedSize, setOptimizedSize] = useState<number>(0);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const optimizeImage = useCallback(() => {
    if (!originalImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const optimized = canvas.toDataURL(`image/${format}`, quality / 100);
      setOptimizedImage(optimized);
      
      // Calculate optimized size (approximate)
      const base64Length = optimized.split(',')[1].length;
      const sizeInBytes = (base64Length * 3) / 4;
      setOptimizedSize(sizeInBytes);
    };

    img.src = originalImage;
  }, [originalImage, quality, format]);

  const downloadOptimized = () => {
    if (!optimizedImage) return;
    
    const link = document.createElement('a');
    link.href = optimizedImage;
    link.download = `optimized-image.${format}`;
    link.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressionRatio = originalSize > 0 ? ((originalSize - optimizedSize) / originalSize * 100) : 0;

  return (
    <ToolLayout
      title="Image Optimizer"
      description="Compress and optimize images for web use"
      icon={ImageIcon}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Image
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload an image
                  </p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Output Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>

            <button
              onClick={optimizeImage}
              disabled={!originalImage}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Optimize Image
            </button>

            {optimizedImage && (
              <button
                onClick={downloadOptimized}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download Optimized</span>
              </button>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {originalImage && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Original</h3>
                  <img
                    src={originalImage}
                    alt="Original"
                    className="w-full h-48 object-contain bg-white dark:bg-gray-800 rounded border"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Size: {formatFileSize(originalSize)}
                  </p>
                </div>
              )}

              {optimizedImage && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Optimized</h3>
                  <img
                    src={optimizedImage}
                    alt="Optimized"
                    className="w-full h-48 object-contain bg-white dark:bg-gray-800 rounded border"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Size: {formatFileSize(optimizedSize)}
                  </p>
                </div>
              )}
            </div>

            {optimizedImage && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-4">
                  Optimization Results
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {compressionRatio.toFixed(1)}%
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200">Size Reduction</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatFileSize(originalSize - optimizedSize)}
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200">Saved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {format.toUpperCase()}
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200">Format</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Image Optimization Tips
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Use JPEG for photos and images with many colors</li>
            <li>• Use PNG for images with transparency or few colors</li>
            <li>• WebP offers better compression than JPEG and PNG</li>
            <li>• Quality 80-90% usually provides good balance of size and quality</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}