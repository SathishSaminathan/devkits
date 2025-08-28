import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import CopyButton from '../../components/CopyButton';

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Preview

## Features
- **Bold text** and *italic text*
- [Links](https://example.com)
- \`inline code\` and code blocks

### Code Example
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists
1. First item
2. Second item
   - Nested item
   - Another nested item

### Blockquote
> This is a blockquote
> It can span multiple lines

### Table
| Name | Age | City |
|------|-----|------|
| John | 25  | NYC  |
| Jane | 30  | LA   |
`);

  const convertMarkdownToHtml = (md: string) => {
    let html = md;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold and Italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
    
    // Lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Tables
    html = html.replace(/\|(.+)\|/g, (match, content) => {
      const cells = content.split('|').map((cell: string) => cell.trim());
      return '<tr>' + cells.map((cell: string) => `<td>${cell}</td>`).join('') + '</tr>';
    });
    html = html.replace(/(<tr>.*<\/tr>)/s, '<table>$1</table>');
    
    // Line breaks
    html = html.replace(/\n/g, '<br>');
    
    return html;
  };

  const loadSample = () => {
    setMarkdown(`# Sample Document

## Introduction
This is a **sample markdown** document to demonstrate the preview functionality.

### Features Demonstrated
- Headers (H1, H2, H3)
- **Bold** and *italic* text
- [External links](https://github.com)
- \`inline code\`
- Code blocks
- Lists and nested items
- Blockquotes
- Tables

### Code Example
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("Developer"))
\`\`\`

### Task List
1. Write markdown content
2. Preview the output
3. Copy the HTML if needed

> **Note:** This is a blockquote example.
> It can contain multiple lines.

### Contact Information
| Platform | Username | Link |
|----------|----------|------|
| GitHub   | @dev     | [Profile](https://github.com) |
| Twitter  | @dev     | [Profile](https://twitter.com) |
`);
  };

  return (
    <ToolLayout
      title="Markdown Preview"
      description="Live markdown editor with real-time HTML preview"
      icon={Eye}
    >
      <div className="space-y-6">
        <div className="flex gap-3 mb-6">
          <button
            onClick={loadSample}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Load Sample
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Markdown Input</h3>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter your markdown here..."
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">HTML Preview</h3>
              <CopyButton text={convertMarkdownToHtml(markdown)} />
            </div>
            <div className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 overflow-auto">
              <div 
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(markdown) }}
                style={{
                  color: 'inherit',
                  lineHeight: '1.6'
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Supported Markdown Syntax
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <p><strong>Headers:</strong> # ## ###</p>
              <p><strong>Bold:</strong> **text**</p>
              <p><strong>Italic:</strong> *text*</p>
              <p><strong>Links:</strong> [text](url)</p>
            </div>
            <div>
              <p><strong>Code:</strong> `code`</p>
              <p><strong>Lists:</strong> - item or 1. item</p>
              <p><strong>Quotes:</strong> {'>'} quote</p>
              <p><strong>Tables:</strong> | col | col |</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}