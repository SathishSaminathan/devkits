import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function CssToTailwind() {
  const [cssInput, setCssInput] = useState('');
  const [tailwindOutput, setTailwindOutput] = useState('');

  const cssToTailwindMap: { [key: string]: string } = {
    // Display
    'display: block': 'block',
    'display: inline-block': 'inline-block',
    'display: inline': 'inline',
    'display: flex': 'flex',
    'display: inline-flex': 'inline-flex',
    'display: grid': 'grid',
    'display: hidden': 'hidden',
    'display: none': 'hidden',

    // Flexbox
    'justify-content: center': 'justify-center',
    'justify-content: flex-start': 'justify-start',
    'justify-content: flex-end': 'justify-end',
    'justify-content: space-between': 'justify-between',
    'justify-content: space-around': 'justify-around',
    'align-items: center': 'items-center',
    'align-items: flex-start': 'items-start',
    'align-items: flex-end': 'items-end',
    'align-items: stretch': 'items-stretch',
    'flex-direction: column': 'flex-col',
    'flex-direction: row': 'flex-row',
    'flex-wrap: wrap': 'flex-wrap',

    // Spacing
    'margin: 0': 'm-0',
    'margin: 4px': 'm-1',
    'margin: 8px': 'm-2',
    'margin: 12px': 'm-3',
    'margin: 16px': 'm-4',
    'margin: 20px': 'm-5',
    'margin: 24px': 'm-6',
    'margin: 32px': 'm-8',
    'padding: 0': 'p-0',
    'padding: 4px': 'p-1',
    'padding: 8px': 'p-2',
    'padding: 12px': 'p-3',
    'padding: 16px': 'p-4',
    'padding: 20px': 'p-5',
    'padding: 24px': 'p-6',
    'padding: 32px': 'p-8',

    // Colors
    'color: #000': 'text-black',
    'color: #fff': 'text-white',
    'color: #f3f4f6': 'text-gray-100',
    'color: #e5e7eb': 'text-gray-200',
    'color: #d1d5db': 'text-gray-300',
    'color: #9ca3af': 'text-gray-400',
    'color: #6b7280': 'text-gray-500',
    'color: #374151': 'text-gray-700',
    'color: #1f2937': 'text-gray-800',
    'color: #111827': 'text-gray-900',
    'background-color: #fff': 'bg-white',
    'background-color: #000': 'bg-black',
    'background-color: #3b82f6': 'bg-blue-500',
    'background-color: #ef4444': 'bg-red-500',
    'background-color: #10b981': 'bg-green-500',

    // Typography
    'font-size: 12px': 'text-xs',
    'font-size: 14px': 'text-sm',
    'font-size: 16px': 'text-base',
    'font-size: 18px': 'text-lg',
    'font-size: 20px': 'text-xl',
    'font-size: 24px': 'text-2xl',
    'font-size: 30px': 'text-3xl',
    'font-weight: 300': 'font-light',
    'font-weight: 400': 'font-normal',
    'font-weight: 500': 'font-medium',
    'font-weight: 600': 'font-semibold',
    'font-weight: 700': 'font-bold',
    'text-align: left': 'text-left',
    'text-align: center': 'text-center',
    'text-align: right': 'text-right',

    // Border
    'border: 1px solid #000': 'border border-black',
    'border: 1px solid #e5e7eb': 'border border-gray-200',
    'border-radius: 4px': 'rounded',
    'border-radius: 6px': 'rounded-md',
    'border-radius: 8px': 'rounded-lg',
    'border-radius: 12px': 'rounded-xl',
    'border-radius: 16px': 'rounded-2xl',
    'border-radius: 50%': 'rounded-full',

    // Width & Height
    'width: 100%': 'w-full',
    'width: 50%': 'w-1/2',
    'width: 25%': 'w-1/4',
    'width: 75%': 'w-3/4',
    'height: 100%': 'h-full',
    'height: 100vh': 'h-screen',
    'max-width: 100%': 'max-w-full',

    // Position
    'position: relative': 'relative',
    'position: absolute': 'absolute',
    'position: fixed': 'fixed',
    'position: sticky': 'sticky',

    // Shadow
    'box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)': 'shadow-sm',
    'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)': 'shadow-md',
    'box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1)': 'shadow-lg',
    'box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25)': 'shadow-2xl',
  };

  const convertCssToTailwind = () => {
    if (!cssInput.trim()) {
      setTailwindOutput('');
      return;
    }

    const lines = cssInput.split('\n');
    const tailwindClasses: string[] = [];
    let currentSelector = '';

    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.includes('{')) {
        currentSelector = trimmedLine.replace('{', '').trim();
        return;
      }

      if (trimmedLine === '}') {
        currentSelector = '';
        return;
      }

      if (trimmedLine && !trimmedLine.includes('{') && !trimmedLine.includes('}')) {
        const property = trimmedLine.replace(';', '').trim();
        
        if (cssToTailwindMap[property]) {
          tailwindClasses.push(cssToTailwindMap[property]);
        } else {
          // Try to handle numeric values
          const numericConversion = handleNumericProperties(property);
          if (numericConversion) {
            tailwindClasses.push(numericConversion);
          }
        }
      }
    });

    const uniqueClasses = [...new Set(tailwindClasses)];
    setTailwindOutput(uniqueClasses.join(' '));
  };

  const handleNumericProperties = (property: string): string | null => {
    // Handle margin/padding with px values
    const marginMatch = property.match(/margin(?:-top|-right|-bottom|-left)?: (\d+)px/);
    if (marginMatch) {
      const value = parseInt(marginMatch[1]);
      const spacing = Math.round(value / 4);
      const direction = property.includes('-top') ? 't' : 
                      property.includes('-right') ? 'r' :
                      property.includes('-bottom') ? 'b' :
                      property.includes('-left') ? 'l' : '';
      return `m${direction}-${spacing}`;
    }

    const paddingMatch = property.match(/padding(?:-top|-right|-bottom|-left)?: (\d+)px/);
    if (paddingMatch) {
      const value = parseInt(paddingMatch[1]);
      const spacing = Math.round(value / 4);
      const direction = property.includes('-top') ? 't' : 
                      property.includes('-right') ? 'r' :
                      property.includes('-bottom') ? 'b' :
                      property.includes('-left') ? 'l' : '';
      return `p${direction}-${spacing}`;
    }

    // Handle width/height with px values
    const widthMatch = property.match(/width: (\d+)px/);
    if (widthMatch) {
      const value = parseInt(widthMatch[1]);
      return `w-[${value}px]`;
    }

    const heightMatch = property.match(/height: (\d+)px/);
    if (heightMatch) {
      const value = parseInt(heightMatch[1]);
      return `h-[${value}px]`;
    }

    return null;
  };

  const loadSample = () => {
    setCssInput(`.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin: 8px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  margin-bottom: 12px;
}`);
  };

  return (
    <ToolLayout
      title="CSS to Tailwind Converter"
      description="Convert CSS styles to Tailwind CSS classes"
      icon={Wand2}
    >
      <div className="space-y-6">
        <div className="flex gap-3 mb-6">
          <button
            onClick={convertCssToTailwind}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Convert to Tailwind
          </button>
          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Load Sample CSS
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">CSS Input</h3>
            <textarea
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              placeholder="Enter your CSS here..."
              className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Tailwind Classes</h3>
              {tailwindOutput && <CopyButton text={tailwindOutput} />}
            </div>
            <div className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 overflow-auto">
              <pre className="text-gray-900 dark:text-white font-mono text-sm whitespace-pre-wrap">
                {tailwindOutput || 'Tailwind classes will appear here...'}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Supported CSS Properties
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <p><strong>Layout:</strong> display, position, flexbox</p>
              <p><strong>Spacing:</strong> margin, padding</p>
            </div>
            <div>
              <p><strong>Typography:</strong> font-size, font-weight, text-align</p>
              <p><strong>Colors:</strong> color, background-color</p>
            </div>
            <div>
              <p><strong>Borders:</strong> border, border-radius</p>
              <p><strong>Effects:</strong> box-shadow</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}