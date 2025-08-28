import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

export default function BasicCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

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
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const getButtonClass = (button: string) => {
    const baseClass = "h-16 text-xl font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95";
    
    if (button === 'C' || button === '±' || button === '%') {
      return `${baseClass} bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500`;
    } else if (['+', '-', '×', '÷', '='].includes(button)) {
      return `${baseClass} bg-orange-500 text-white hover:bg-orange-600 ${operation === button ? 'bg-orange-600' : ''}`;
    } else {
      return `${baseClass} bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600`;
    }
  };

  const handleButtonClick = (button: string) => {
    if (button === 'C') {
      clear();
    } else if (button === '±') {
      setDisplay(String(parseFloat(display) * -1));
    } else if (button === '%') {
      setDisplay(String(parseFloat(display) / 100));
    } else if (button === '.') {
      inputDecimal();
    } else if (button === '=') {
      handleEquals();
    } else if (['+', '-', '×', '÷'].includes(button)) {
      performOperation(button);
    } else {
      inputNumber(button);
    }
  };

  return (
    <ToolLayout
      title="Basic Calculator"
      description="Standard calculator with basic arithmetic operations"
      icon={Calculator}
    >
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
          {/* Display */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="text-right text-4xl font-mono text-white overflow-hidden">
              {display}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            {buttons.map((row, rowIndex) => (
              <div key={rowIndex} className={`grid gap-3 ${row.length === 5 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {row.map((button, buttonIndex) => (
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
               <p><strong>Currency:</strong> All amounts in Indian Rupees (₹)</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Calculator Functions
          </h4>
          <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <p><strong>C:</strong> Clear all</p>
            <p><strong>±:</strong> Change sign</p>
            <p><strong>%:</strong> Percentage</p>
            <p><strong>Basic operations:</strong> +, -, ×, ÷</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}