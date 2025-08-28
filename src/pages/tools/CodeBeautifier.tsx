import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function CodeBeautifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState<'html' | 'css' | 'javascript' | 'json'>('javascript');

  const beautifyCode = () => {
    let beautified = '';
    
    switch (language) {
      case 'json':
        try {
          const parsed = JSON.parse(input);
          beautified = JSON.stringify(parsed, null, 2);
        } catch (err) {
          beautified = 'Invalid JSON format';
        }
        break;
        
      case 'javascript':
        beautified = beautifyJavaScript(input);
        break;
        
      case 'css':
        beautified = beautifyCSS(input);
        break;
        
      case 'html':
        beautified = beautifyHTML(input);
        break;
        
      default:
        beautified = input;
    }
    
    setOutput(beautified);
  };

  const beautifyJavaScript = (code: string) => {
    // Simple JavaScript beautifier
    let result = code;
    let indent = 0;
    const indentSize = 2;
    
    result = result.replace(/\s+/g, ' ').trim();
    result = result.replace(/;/g, ';\n');
    result = result.replace(/\{/g, ' {\n');
    result = result.replace(/\}/g, '\n}\n');
    result = result.replace(/,/g, ',\n');
    
    const lines = result.split('\n');
    const beautifiedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.includes('}')) indent = Math.max(0, indent - 1);
      const indentedLine = ' '.repeat(indent * indentSize) + trimmed;
      if (trimmed.includes('{')) indent++;
      return indentedLine;
    });
    
    return beautifiedLines.join('\n').replace(/\n\s*\n/g, '\n');
  };

  const beautifyCSS = (code: string) => {
    let result = code;
    let indent = 0;
    const indentSize = 2;
    
    result = result.replace(/\s+/g, ' ').trim();
    result = result.replace(/\{/g, ' {\n');
    result = result.replace(/\}/g, '\n}\n');
    result = result.replace(/;/g, ';\n');
    result = result.replace(/,/g, ',\n');
    
    const lines = result.split('\n');
    const beautifiedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.includes('}')) indent = Math.max(0, indent - 1);
      const indentedLine = ' '.repeat(indent * indentSize) + trimmed;
      if (trimmed.includes('{')) indent++;
      return indentedLine;
    });
    
    return beautifiedLines.join('\n').replace(/\n\s*\n/g, '\n');
  };

  const beautifyHTML = (code: string) => {
    let result = code;
    let indent = 0;
    const indentSize = 2;
    
    result = result.replace(/></g, '>\n<');
    
    const lines = result.split('\n');
    const beautifiedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('</')) indent = Math.max(0, indent - 1);
      const indentedLine = ' '.repeat(indent * indentSize) + trimmed;
      if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
        indent++;
      }
      return indentedLine;
    });
    
    return beautifiedLines.join('\n');
  };

  const minifyCode = () => {
    let minified = '';
    
    switch (language) {
      case 'json':
        try {
          const parsed = JSON.parse(input);
          minified = JSON.stringify(parsed);
        } catch (err) {
          minified = 'Invalid JSON format';
        }
        break;
        
      default:
        minified = input.replace(/\s+/g, ' ').replace(/\n/g, '').trim();
    }
    
    setOutput(minified);
  };

  const loadSample = () => {
    const samples = {
      javascript: `function calculateTotal(items){let total=0;for(let i=0;i<items.length;i++){total+=items[i].price*items[i].quantity;}return total;}const cart=[{name:"Apple",price:1.5,quantity:3},{name:"Banana",price:0.8,quantity:5}];console.log("Total:",calculateTotal(cart));`,
      css: `.container{display:flex;justify-content:center;align-items:center;height:100vh;background:linear-gradient(45deg,#ff6b6b,#4ecdc4);}.card{background:white;padding:2rem;border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,0.1);text-align:center;}`,
      html: `<div class="container"><header><h1>Welcome</h1><nav><ul><li><a href="#home">Home</a></li><li><a href="#about">About</a></li></ul></nav></header><main><section><p>This is a sample HTML document.</p></section></main></div>`,
      json: `{"name":"John Doe","age":30,"address":{"street":"123 Main St","city":"New York","zipCode":"10001"},"hobbies":["reading","coding","traveling"],"isActive":true}`
    };
    
    setInput(samples[language]);
  };

  return (
    <ToolLayout
      title="Code Beautifier"
      description="Format and beautify HTML, CSS, JavaScript, and JSON"
      icon={Wand2}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="json">JSON</option>
          </select>
          
          <button
            onClick={beautifyCode}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Beautify
          </button>
          
          <button
            onClick={minifyCode}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Minify
          </button>
          
          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Load Sample
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Input Code</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter your ${language.toUpperCase()} code here...`}
              className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Formatted Output</h3>
              {output && <CopyButton text={output} />}
            </div>
            <div className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 overflow-auto">
              <pre className="text-gray-900 dark:text-white font-mono text-sm whitespace-pre-wrap">
                {output || 'Formatted code will appear here...'}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Code Formatting Benefits
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• <strong>Beautify:</strong> Improves code readability with proper indentation</li>
            <li>• <strong>Minify:</strong> Reduces file size by removing unnecessary whitespace</li>
            <li>• <strong>Consistency:</strong> Ensures uniform code style across projects</li>
            <li>• <strong>Debugging:</strong> Makes it easier to spot syntax errors</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}