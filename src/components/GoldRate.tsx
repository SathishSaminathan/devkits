import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface GoldRateData {
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

export default function GoldRate() {
  const [goldRate, setGoldRate] = useState<GoldRateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated gold rate data (in a real app, you'd fetch from an API)
    const fetchGoldRate = () => {
      // Simulate API call with realistic gold prices in INR per 10 grams
      const basePrice = 62500;
      const randomChange = (Math.random() - 0.5) * 1000;
      const price = basePrice + randomChange;
      const change = randomChange;
      const changePercent = (change / basePrice) * 100;

      setGoldRate({
        price: Math.round(price),
        change: Math.round(change),
        changePercent: Number(changePercent.toFixed(2)),
        lastUpdated: new Date().toLocaleTimeString('en-IN')
      });
      setLoading(false);
    };

    fetchGoldRate();
    const interval = setInterval(fetchGoldRate, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg animate-pulse">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white/30 rounded"></div>
          <span className="text-sm">Loading gold rate...</span>
        </div>
      </div>
    );
  }

  if (!goldRate) return null;

  const getTrendIcon = () => {
    if (goldRate.change > 0) return <TrendingUp className="w-4 h-4" />;
    if (goldRate.change < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (goldRate.change > 0) return 'text-green-200';
    if (goldRate.change < 0) return 'text-red-200';
    return 'text-yellow-200';
  };

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Gold (10g):</span>
          <span className="font-bold">₹{goldRate.price.toLocaleString('en-IN')}</span>
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="text-sm">
            {goldRate.change > 0 ? '+' : ''}₹{goldRate.change}
          </span>
          <span className="text-xs">
            ({goldRate.changePercent > 0 ? '+' : ''}{goldRate.changePercent}%)
          </span>
        </div>
      </div>
      <div className="text-xs text-yellow-100 mt-1">
        Updated: {goldRate.lastUpdated}
      </div>
    </div>
  );
}