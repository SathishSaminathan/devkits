import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '^':
        return Math.pow(firstValue, secondValue);
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleScientificFunction = (func: string) => {
    const value = parseFloat(display);
    let result = 0;

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case '√':
        result = Math.sqrt(value);
        break;
      case 'x²':
        result = value * value;
        break;
      case '1/x':
        result = 1 / value;
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const handleMemoryFunction = (func: string) => {
    const value = parseFloat(display);
    
    switch (func) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(String(memory));
        setWaitingForOperand(true);
        break;
      case 'M+':
        setMemory(memory + value);
        break;
      case 'M-':
        setMemory(memory - value);
        break;
      case 'MS':
        setMemory(value);
        break;
    }
  };

  const scientificButtons = [
    ['MC', 'MR', 'M+', 'M-', 'MS'],
    ['sin', 'cos', 'tan', 'log', 'ln'],
    ['π', 'e', '√', 'x²', '1/x'],
    ['(', ')', '^', 'C', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const getButtonClass = (button: string) => {
    const baseClass = "h-12 text-sm font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95";
    
    if (['MC', 'MR', 'M+', 'M-', 'MS'].includes(button)) {
      return `${baseClass} bg-purple-500 text-white hover:bg-purple-600`;
    } else if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'x²', '1/x', 'π', 'e', '(', ')', '^'].includes(button)) {
      return `${baseClass} bg-blue-500 text-white hover:bg-blue-600`;
    } else if (button === 'C') {
      return `${baseClass} bg-red-500 text-white hover:bg-red-600`;
    } else if (['+', '-', '×', '÷', '='].includes(button)) {
      return `${baseClass} bg-orange-500 text-white hover:bg-orange-600`;
    } else {
      return `${baseClass} bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600`;
    }
  };

  const handleButtonClick = (button: string) => {
    if (button === 'C') {
      clear();
    } else if (button === '.') {
      inputDecimal();
    } else if (button === '=') {
      if (previousValue !== null && operation) {
        const inputValue = parseFloat(display);
        const newValue = calculate(previousValue, inputValue, operation);
        setDisplay(String(newValue));
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
      }
    } else if (['+', '-', '×', '÷', '^'].includes(button)) {
      performOperation(button);
    } else if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'x²', '1/x', 'π', 'e'].includes(button)) {
      handleScientificFunction(button);
    } else if (['MC', 'MR', 'M+', 'M-', 'MS'].includes(button)) {
      handleMemoryFunction(button);
    } else if (!isNaN(Number(button))) {
      inputNumber(button);
    }
  };

  return (
    <ToolLayout
      title="Scientific Calculator"
      description="Advanced calculator with scientific functions and operations"
      icon={Calculator}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
          {/* Display */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="text-right text-3xl font-mono text-white overflow-hidden">
              {display}
            </div>
            {memory !== 0 && (
              <div className="text-right text-sm text-gray-400 mt-2">
                Memory: {memory}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            {scientificButtons.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-5 gap-2">
                {row.map((button) => (
                  <button
                    key={button}
                    onClick={() => handleButtonClick(button)}
                    className={`${getButtonClass(button)} ${
                      button === '0' && row.length === 3 ? 'col-span-2' : ''
                    }`}
                  >
                    {button}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Scientific Functions
            </h4>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <p><strong>Trigonometry:</strong> sin, cos, tan</p>
              <p><strong>Logarithms:</strong> log, ln</p>
              <p><strong>Powers:</strong> x², √, ^</p>
              <p><strong>Constants:</strong> π, e</p>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
              Memory Functions
            </h4>
            <div className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
              <p><strong>MC:</strong> Memory Clear</p>
              <p><strong>MR:</strong> Memory Recall</p>
              <p><strong>M+:</strong> Memory Add</p>
              <p><strong>M-:</strong> Memory Subtract</p>
              <p><strong>MS:</strong> Memory Store</p>
              <p><strong>Currency:</strong> All amounts in Indian Rupees (₹)</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}