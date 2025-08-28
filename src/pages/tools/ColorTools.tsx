import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function ColorTools() {
  const [color, setColor] = useState('#3B82F6');
  const [hexInput, setHexInput] = useState('#3B82F6');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setColor(value);
    }
  };

  const rgb = hexToRgb(color);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const colorFormats = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '' },
    { label: 'HSL', value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '' }
  ];

  return (
    <ToolLayout
      title="Color Tools"
      description="Color picker, format converter, and contrast checker"
      icon={Palette}
    >
      <div className="space-y-8">
        {/* Color Picker */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Color Picker</h3>
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <div 
                className="w-full h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: color }}
              ></div>
            </div>
          </div>
        </div>

        {/* HEX Input */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">HEX Input</h3>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#3B82F6"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div 
              className="w-12 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: hexInput }}
            ></div>
          </div>
        </div>

        {/* Color Formats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {colorFormats.map((format) => (
            <div key={format.label} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{format.label}</h3>
                  <p className="text-lg font-mono text-gray-800 dark:text-gray-200 mt-1">
                    {format.value}
                  </p>
                </div>
                <CopyButton text={format.value} />
              </div>
            </div>
          ))}
        </div>

        {/* Color Palette */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Color Shades</h3>
          <div className="grid grid-cols-5 gap-2">
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => {
              const factor = shade <= 500 ? (500 - shade) / 400 : (shade - 500) / 400;
              const rgb = hexToRgb(color);
              if (!rgb) return null;
              
              let newR, newG, newB;
              if (shade <= 500) {
                newR = Math.round(rgb.r + (255 - rgb.r) * factor);
                newG = Math.round(rgb.g + (255 - rgb.g) * factor);
                newB = Math.round(rgb.b + (255 - rgb.b) * factor);
              } else {
                newR = Math.round(rgb.r * (1 - factor));
                newG = Math.round(rgb.g * (1 - factor));
                newB = Math.round(rgb.b * (1 - factor));
              }
              
              const shadeColor = `rgb(${newR}, ${newG}, ${newB})`;
              const shadeHex = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
              
              return (
                <div key={shade} className="text-center">
                  <div 
                    className="w-full h-16 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 border border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: shadeColor }}
                    onClick={() => setColor(shadeHex)}
                    title={`Click to use ${shadeHex}`}
                  ></div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{shade}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}