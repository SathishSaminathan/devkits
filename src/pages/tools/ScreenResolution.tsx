import React, { useState, useEffect } from 'react';
import { Monitor } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function ScreenResolution() {
  const [screenInfo, setScreenInfo] = useState({
    width: 0,
    height: 0,
    pixelRatio: 0,
    colorDepth: 0,
    orientation: ''
  });

  useEffect(() => {
    const updateScreenInfo = () => {
      setScreenInfo({
        width: window.screen.width,
        height: window.screen.height,
        pixelRatio: window.devicePixelRatio,
        colorDepth: window.screen.colorDepth,
        orientation: window.screen.orientation?.type || 'unknown'
      });
    };

    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);
    window.addEventListener('orientationchange', updateScreenInfo);

    return () => {
      window.removeEventListener('resize', updateScreenInfo);
      window.removeEventListener('orientationchange', updateScreenInfo);
    };
  }, []);

  const infoItems = [
    { label: 'Screen Width', value: `${screenInfo.width}px`, key: 'width' },
    { label: 'Screen Height', value: `${screenInfo.height}px`, key: 'height' },
    { label: 'Resolution', value: `${screenInfo.width} × ${screenInfo.height}`, key: 'resolution' },
    { label: 'Pixel Ratio', value: screenInfo.pixelRatio.toString(), key: 'pixelRatio' },
    { label: 'Color Depth', value: `${screenInfo.colorDepth}-bit`, key: 'colorDepth' },
    { label: 'Orientation', value: screenInfo.orientation, key: 'orientation' }
  ];

  return (
    <ToolLayout
      title="Screen Resolution"
      description="Get detailed information about your screen resolution and display properties"
      icon={Monitor}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoItems.map((item) => (
            <div key={item.key} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {item.value}
                  </p>
                </div>
                <CopyButton text={item.value} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Complete Screen Information
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                Resolution: {screenInfo.width} × {screenInfo.height} | Ratio: {screenInfo.pixelRatio}x | Color: {screenInfo.colorDepth}-bit
              </span>
              <CopyButton text={`${screenInfo.width}×${screenInfo.height}`} />
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}