import React, { useState } from 'react';
import { Paintbrush } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function CssGenerator() {
  const [activeTab, setActiveTab] = useState<'gradient' | 'shadow' | 'border'>('gradient');
  
  // Gradient state
  const [gradient, setGradient] = useState({
    type: 'linear',
    direction: 'to right',
    color1: '#3B82F6',
    color2: '#8B5CF6'
  });

  // Shadow state
  const [shadow, setShadow] = useState({
    x: 0,
    y: 4,
    blur: 6,
    spread: 0,
    color: '#000000',
    opacity: 25,
    inset: false
  });

  // Border state
  const [border, setBorder] = useState({
    width: 2,
    style: 'solid',
    color: '#3B82F6',
    radius: 8
  });

  const generateGradientCSS = () => {
    const { type, direction, color1, color2 } = gradient;
    if (type === 'linear') {
      return `background: linear-gradient(${direction}, ${color1}, ${color2});`;
    } else {
      return `background: radial-gradient(circle, ${color1}, ${color2});`;
    }
  };

  const generateShadowCSS = () => {
    const { x, y, blur, spread, color, opacity, inset } = shadow;
    const shadowColor = `${color}${Math.round(opacity * 2.55).toString(16).padStart(2, '0')}`;
    return `box-shadow: ${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${shadowColor};`;
  };

  const generateBorderCSS = () => {
    const { width, style, color, radius } = border;
    return `border: ${width}px ${style} ${color};\nborder-radius: ${radius}px;`;
  };

  const getCurrentCSS = () => {
    switch (activeTab) {
      case 'gradient': return generateGradientCSS();
      case 'shadow': return generateShadowCSS();
      case 'border': return generateBorderCSS();
      default: return '';
    }
  };

  const tabs = [
    { id: 'gradient', name: 'Gradient', icon: '🎨' },
    { id: 'shadow', name: 'Box Shadow', icon: '🌑' },
    { id: 'border', name: 'Border', icon: '⬜' }
  ];

  return (
    <ToolLayout
      title="CSS Generator"
      description="Generate CSS for gradients, shadows, and borders"
      icon={Paintbrush}
    >
      <div className="space-y-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {activeTab === 'gradient' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gradient Type
                  </label>
                  <select
                    value={gradient.type}
                    onChange={(e) => setGradient(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                  </select>
                </div>

                {gradient.type === 'linear' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Direction
                    </label>
                    <select
                      value={gradient.direction}
                      onChange={(e) => setGradient(prev => ({ ...prev, direction: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="to right">To Right</option>
                      <option value="to left">To Left</option>
                      <option value="to bottom">To Bottom</option>
                      <option value="to top">To Top</option>
                      <option value="45deg">45 Degrees</option>
                      <option value="135deg">135 Degrees</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Color 1
                    </label>
                    <input
                      type="color"
                      value={gradient.color1}
                      onChange={(e) => setGradient(prev => ({ ...prev, color1: e.target.value }))}
                      className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Color 2
                    </label>
                    <input
                      type="color"
                      value={gradient.color2}
                      onChange={(e) => setGradient(prev => ({ ...prev, color2: e.target.value }))}
                      className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'shadow' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      X Offset: {shadow.x}px
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={shadow.x}
                      onChange={(e) => setShadow(prev => ({ ...prev, x: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Y Offset: {shadow.y}px
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={shadow.y}
                      onChange={(e) => setShadow(prev => ({ ...prev, y: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Blur: {shadow.blur}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={shadow.blur}
                      onChange={(e) => setShadow(prev => ({ ...prev, blur: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Spread: {shadow.spread}px
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={shadow.spread}
                      onChange={(e) => setShadow(prev => ({ ...prev, spread: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Color
                    </label>
                    <input
                      type="color"
                      value={shadow.color}
                      onChange={(e) => setShadow(prev => ({ ...prev, color: e.target.value }))}
                      className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Opacity: {shadow.opacity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={shadow.opacity}
                      onChange={(e) => setShadow(prev => ({ ...prev, opacity: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={shadow.inset}
                    onChange={(e) => setShadow(prev => ({ ...prev, inset: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Inset Shadow</span>
                </label>
              </>
            )}

            {activeTab === 'border' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Border Width: {border.width}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={border.width}
                    onChange={(e) => setBorder(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Border Style
                  </label>
                  <select
                    value={border.style}
                    onChange={(e) => setBorder(prev => ({ ...prev, style: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                    <option value="double">Double</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Border Color
                  </label>
                  <input
                    type="color"
                    value={border.color}
                    onChange={(e) => setBorder(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Border Radius: {border.radius}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={border.radius}
                    onChange={(e) => setBorder(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                <div
                  className="w-32 h-32 flex items-center justify-center text-gray-600 dark:text-gray-400 font-medium"
                  style={{
                    ...(activeTab === 'gradient' && { background: generateGradientCSS().split(': ')[1].slice(0, -1) }),
                    ...(activeTab === 'shadow' && { 
                      backgroundColor: '#f3f4f6',
                      boxShadow: generateShadowCSS().split(': ')[1].slice(0, -1)
                    }),
                    ...(activeTab === 'border' && {
                      backgroundColor: '#f3f4f6',
                      border: `${border.width}px ${border.style} ${border.color}`,
                      borderRadius: `${border.radius}px`
                    })
                  }}
                >
                  Preview
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Generated CSS</h3>
                <CopyButton text={getCurrentCSS()} />
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 font-mono text-sm">
                  {getCurrentCSS()}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}