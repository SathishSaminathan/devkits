import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [results, setResults] = useState({
    totalInvestment: 0,
    futureValue: 0,
    totalReturns: 0
  });

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const numberOfMonths = timePeriod * 12;
    
    // SIP Future Value Formula: PMT * [((1 + r)^n - 1) / r] * (1 + r)
    const futureValue = monthlyInvestment * 
      (((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    
    const totalInvestment = monthlyInvestment * numberOfMonths;
    const totalReturns = futureValue - totalInvestment;

    setResults({
      totalInvestment,
      futureValue,
      totalReturns
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const generateYearlyBreakdown = () => {
    const breakdown = [];
    const monthlyRate = expectedReturn / 100 / 12;
    let cumulativeInvestment = 0;
    let cumulativeValue = 0;

    for (let year = 1; year <= Math.min(10, timePeriod); year++) {
      const monthsInYear = year * 12;
      const yearlyInvestment = monthlyInvestment * 12;
      cumulativeInvestment += yearlyInvestment;
      
      const yearlyValue = monthlyInvestment * 
        (((Math.pow(1 + monthlyRate, monthsInYear) - 1) / monthlyRate) * (1 + monthlyRate));
      
      breakdown.push({
        year,
        investment: cumulativeInvestment,
        value: yearlyValue,
        returns: yearlyValue - cumulativeInvestment
      });
    }

    return breakdown;
  };

  return (
    <ToolLayout
      title="SIP Calculator"
      description="Calculate returns on Systematic Investment Plans (SIP)"
      icon={TrendingUp}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">SIP Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Investment: {formatCurrency(monthlyInvestment)}
                </label>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>₹500</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Annual Return: {expectedReturn}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Investment Period: {timePeriod} years
                </label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 year</span>
                  <span>40 years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">SIP Returns</h3>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Investment</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(results.totalInvestment)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Future Value</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(results.futureValue)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Returns</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(results.totalReturns)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Return Multiple</div>
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {(results.futureValue / results.totalInvestment).toFixed(2)}x
                </div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Investment vs Returns</span>
                <span>{((results.totalReturns / results.futureValue) * 100).toFixed(1)}% returns</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(results.totalInvestment / results.futureValue) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Yearly Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Year-wise Growth (First 10 Years)
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Year</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Investment</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Value</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Returns</th>
                </tr>
              </thead>
              <tbody>
                {generateYearlyBreakdown().map((row) => (
                  <tr key={row.year} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{row.year}</td>
                    <td className="py-3 px-4 text-right text-blue-600 dark:text-blue-400">
                      {formatCurrency(row.investment)}
                    </td>
                    <td className="py-3 px-4 text-right text-green-600 dark:text-green-400">
                      {formatCurrency(row.value)}
                    </td>
                    <td className="py-3 px-4 text-right text-purple-600 dark:text-purple-400">
                      {formatCurrency(row.returns)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            SIP Investment Tips
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Start early to benefit from compound growth</li>
            <li>• Stay consistent with monthly investments</li>
            <li>• Diversify across different mutual fund categories</li>
            <li>• Review and adjust your portfolio annually</li>
            <li>• Don't stop SIPs during market downturns</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}