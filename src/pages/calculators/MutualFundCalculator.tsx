import React, { useState, useEffect } from 'react';
import { PiggyBank } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

export default function MutualFundCalculator() {
  const [investmentType, setInvestmentType] = useState<'lumpsum' | 'sip'>('sip');
  const [initialAmount, setInitialAmount] = useState(100000);
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [inflationRate, setInflationRate] = useState(6);
  const [results, setResults] = useState({
    futureValue: 0,
    totalInvestment: 0,
    totalReturns: 0,
    realValue: 0
  });

  const calculateMutualFund = () => {
    let futureValue = 0;
    let totalInvestment = 0;

    if (investmentType === 'lumpsum') {
      // Lumpsum calculation: A = P(1 + r/100)^t
      futureValue = initialAmount * Math.pow(1 + expectedReturn / 100, timePeriod);
      totalInvestment = initialAmount;
    } else {
      // SIP calculation
      const monthlyRate = expectedReturn / 100 / 12;
      const numberOfMonths = timePeriod * 12;
      
      futureValue = monthlyAmount * 
        (((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate) * (1 + monthlyRate));
      totalInvestment = monthlyAmount * numberOfMonths;
    }

    const totalReturns = futureValue - totalInvestment;
    
    // Calculate real value after inflation
    const realValue = futureValue / Math.pow(1 + inflationRate / 100, timePeriod);

    setResults({
      futureValue,
      totalInvestment,
      totalReturns,
      realValue
    });
  };

  useEffect(() => {
    calculateMutualFund();
  }, [investmentType, initialAmount, monthlyAmount, expectedReturn, timePeriod, inflationRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const fundCategories = [
    { name: 'Large Cap Equity', return: '10-12%', risk: 'Moderate' },
    { name: 'Mid Cap Equity', return: '12-15%', risk: 'High' },
    { name: 'Small Cap Equity', return: '15-18%', risk: 'Very High' },
    { name: 'Hybrid Funds', return: '8-10%', risk: 'Low-Moderate' },
    { name: 'Debt Funds', return: '6-8%', risk: 'Low' },
    { name: 'ELSS', return: '12-15%', risk: 'High' }
  ];

  return (
    <ToolLayout
      title="Mutual Fund Calculator"
      description="Calculate mutual fund returns and investment growth"
      icon={PiggyBank}
    >
      <div className="space-y-8">
        {/* Investment Type Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setInvestmentType('sip')}
              className={`px-6 py-2 rounded-md transition-colors duration-200 ${
                investmentType === 'sip'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              SIP Investment
            </button>
            <button
              onClick={() => setInvestmentType('lumpsum')}
              className={`px-6 py-2 rounded-md transition-colors duration-200 ${
                investmentType === 'lumpsum'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Lumpsum Investment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Investment Details</h3>
            
            <div className="space-y-6">
              {investmentType === 'lumpsum' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Initial Investment: {formatCurrency(initialAmount)}
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="10000000"
                    step="10000"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>₹10K</span>
                    <span>₹1Cr</span>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Investment: {formatCurrency(monthlyAmount)}
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>₹1K</span>
                    <span>₹1L</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Annual Return: {expectedReturn}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1%</span>
                  <span>25%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Investment Period: {timePeriod} years
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Inflation Rate: {inflationRate}%
                </label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>2%</span>
                  <span>10%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Investment Returns</h3>
            
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
                <div className="text-sm text-gray-600 dark:text-gray-400">Real Value (After Inflation)</div>
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {formatCurrency(results.realValue)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Return Multiple</div>
                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {(results.futureValue / results.totalInvestment).toFixed(2)}x
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fund Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Mutual Fund Categories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fundCategories.map((fund, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{fund.name}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Expected Return:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">{fund.return}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Risk Level:</span>
                    <span className={`font-medium ${
                      fund.risk === 'Low' ? 'text-green-600 dark:text-green-400' :
                      fund.risk === 'Low-Moderate' ? 'text-yellow-600 dark:text-yellow-400' :
                      fund.risk === 'Moderate' ? 'text-orange-600 dark:text-orange-400' :
                      fund.risk === 'High' ? 'text-red-600 dark:text-red-400' :
                      'text-red-700 dark:text-red-300'
                    }`}>
                      {fund.risk}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Mutual Fund Investment Tips
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Diversify across different fund categories and asset classes</li>
            <li>• Consider your risk tolerance and investment horizon</li>
            <li>• Review fund performance and expense ratios regularly</li>
            <li>• SIP investments help average out market volatility</li>
            <li>• Stay invested for long-term to benefit from compounding</li>
            <li>• Consider tax implications (ELSS for tax saving)</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}