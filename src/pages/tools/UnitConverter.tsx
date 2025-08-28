import React, { useState, useEffect } from 'react';
import { Ruler } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

export default function UnitConverter() {
  const [category, setCategory] = useState<'length' | 'weight' | 'temperature' | 'area' | 'volume'>('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const units = {
    length: {
      meter: { name: 'Meter', factor: 1 },
      kilometer: { name: 'Kilometer', factor: 1000 },
      centimeter: { name: 'Centimeter', factor: 0.01 },
      millimeter: { name: 'Millimeter', factor: 0.001 },
      inch: { name: 'Inch', factor: 0.0254 },
      foot: { name: 'Foot', factor: 0.3048 },
      yard: { name: 'Yard', factor: 0.9144 },
      mile: { name: 'Mile', factor: 1609.34 }
    },
    weight: {
      kilogram: { name: 'Kilogram', factor: 1 },
      gram: { name: 'Gram', factor: 0.001 },
      pound: { name: 'Pound', factor: 0.453592 },
      ounce: { name: 'Ounce', factor: 0.0283495 },
      ton: { name: 'Ton', factor: 1000 },
      stone: { name: 'Stone', factor: 6.35029 }
    },
    temperature: {
      celsius: { name: 'Celsius' },
      fahrenheit: { name: 'Fahrenheit' },
      kelvin: { name: 'Kelvin' }
    },
    area: {
      square_meter: { name: 'Square Meter', factor: 1 },
      square_kilometer: { name: 'Square Kilometer', factor: 1000000 },
      square_centimeter: { name: 'Square Centimeter', factor: 0.0001 },
      square_inch: { name: 'Square Inch', factor: 0.00064516 },
      square_foot: { name: 'Square Foot', factor: 0.092903 },
      acre: { name: 'Acre', factor: 4046.86 },
      hectare: { name: 'Hectare', factor: 10000 }
    },
    volume: {
      liter: { name: 'Liter', factor: 1 },
      milliliter: { name: 'Milliliter', factor: 0.001 },
      gallon: { name: 'Gallon (US)', factor: 3.78541 },
      quart: { name: 'Quart', factor: 0.946353 },
      pint: { name: 'Pint', factor: 0.473176 },
      cup: { name: 'Cup', factor: 0.236588 },
      fluid_ounce: { name: 'Fluid Ounce', factor: 0.0295735 }
    }
  };

  useEffect(() => {
    const unitKeys = Object.keys(units[category]);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1]);
  }, [category]);

  useEffect(() => {
    if (inputValue && fromUnit && toUnit) {
      convertValue();
    }
  }, [inputValue, fromUnit, toUnit, category]);

  const convertValue = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('');
      return;
    }

    if (category === 'temperature') {
      setResult(convertTemperature(value, fromUnit, toUnit).toString());
    } else {
      const fromFactor = units[category][fromUnit as keyof typeof units[typeof category]].factor;
      const toFactor = units[category][toUnit as keyof typeof units[typeof category]].factor;
      const converted = (value * fromFactor) / toFactor;
      setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
    }
  };

  const convertTemperature = (value: number, from: string, to: string) => {
    let celsius = value;
    
    // Convert to Celsius first
    if (from === 'fahrenheit') {
      celsius = (value - 32) * 5/9;
    } else if (from === 'kelvin') {
      celsius = value - 273.15;
    }
    
    // Convert from Celsius to target
    if (to === 'fahrenheit') {
      return celsius * 9/5 + 32;
    } else if (to === 'kelvin') {
      return celsius + 273.15;
    }
    
    return celsius;
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert between different units of measurement"
      icon={Ruler}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.keys(units).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as any)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                category === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(units[category]).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Value
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value to convert"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={swapUnits}
              className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
              title="Swap units"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(units[category]).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Result
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-lg">
                {result || '0'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Quick Reference
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <p><strong>Length:</strong> Metric & Imperial units</p>
              <p><strong>Weight:</strong> Grams to pounds and more</p>
            </div>
            <div>
              <p><strong>Temperature:</strong> Celsius, Fahrenheit, Kelvin</p>
              <p><strong>Area:</strong> Square meters, acres, hectares</p>
            </div>
            <div>
              <p><strong>Volume:</strong> Liters, gallons, cups</p>
              <p><strong>Precision:</strong> Results rounded to 6 decimals</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}