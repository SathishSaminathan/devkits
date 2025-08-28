import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(15);
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0
  });

  const calculateLoan = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      const monthlyPayment = principal / numberOfPayments;
      setResults({
        monthlyPayment,
        totalPayment: principal,
        totalInterest: 0
      });
      return;
    }

    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const generateAmortizationSchedule = () => {
    const schedule = [];
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    let remainingBalance = loanAmount;

    for (let month = 1; month <= Math.min(12, numberOfPayments); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = results.monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        payment: results.monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance
      });
    }

    return schedule;
  };

  return (
    <ToolLayout
      title="Loan Calculator"
      description="Calculate loan payments, interest, and amortization schedules"
      icon={DollarSign}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Loan Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Amount: {formatCurrency(loanAmount)}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>₹1K</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interest Rate: {interestRate}% per year
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="30"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0.1%</span>
                  <span>30%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Term: {loanTerm} years
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Loan Summary</h3>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Payment</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(results.monthlyPayment)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Payment</div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(results.totalPayment)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Interest</div>
                <div className="text-xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(results.totalInterest)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Interest Percentage</div>
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {((results.totalInterest / loanAmount) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Amortization Schedule (First 12 Months)
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Month</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Payment</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Principal</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Interest</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Balance</th>
                </tr>
              </thead>
              <tbody>
                {generateAmortizationSchedule().map((row) => (
                  <tr key={row.month} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{row.month}</td>
                    <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                      {formatCurrency(row.payment)}
                    </td>
                    <td className="py-3 px-4 text-right text-green-600 dark:text-green-400">
                      {formatCurrency(row.principal)}
                    </td>
                    <td className="py-3 px-4 text-right text-red-600 dark:text-red-400">
                      {formatCurrency(row.interest)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                      {formatCurrency(row.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Loan Calculator Tips
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Lower interest rates significantly reduce total payment</li>
            <li>• Shorter loan terms mean higher monthly payments but less total interest</li>
            <li>• Making extra principal payments can save thousands in interest</li>
            <li>• Consider the total cost of the loan, not just monthly payments</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}