'use client';

import { BoltIcon } from '@heroicons/react/24/outline';

interface TokenBreakdownProps {
  webTokens: number;
  socialTokens: number;
  panelTokens: number;
  totalTokens: number;
}

export default function TokenBreakdown({ webTokens, socialTokens, panelTokens, totalTokens }: TokenBreakdownProps) {
  const calculatePercentage = (value: number) => {
    return ((value / totalTokens) * 100).toFixed(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Desglose de Tokens</h3>
        <div className="flex items-center space-x-1">
          <BoltIcon className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500">{totalTokens.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Web</span>
            <span className="text-gray-900">{webTokens.toLocaleString()} ({calculatePercentage(webTokens)}%)</span>
          </div>
          <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-nia-pink rounded-full" 
              style={{ width: `${calculatePercentage(webTokens)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Redes Sociales</span>
            <span className="text-gray-900">{socialTokens.toLocaleString()} ({calculatePercentage(socialTokens)}%)</span>
          </div>
          <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${calculatePercentage(socialTokens)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">NNIA Dashboard</span>
            <span className="text-gray-900">{panelTokens.toLocaleString()} ({calculatePercentage(panelTokens)}%)</span>
          </div>
          <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full" 
              style={{ width: `${calculatePercentage(panelTokens)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 