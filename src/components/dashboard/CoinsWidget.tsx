import React from 'react';
import { ChevronDown, Filter, RefreshCw, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const CoinsWidget = () => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">All Assets</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">24H</span>
          <button className="p-1 bg-gray-800 rounded-md">
            <Filter className="h-3 w-3" />
          </button>
          <button className="p-1 bg-gray-800 rounded-md">
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      <h3 className="text-lg font-medium mb-4">My Top Coins</h3>
      
      <div className="grid grid-cols-1 gap-3">
        <CoinItem 
          icon="🟠"
          name="BTC"
          fullName="Bitcoin"
          amount="0.095200"
          value="$2,500.50"
          change={0.8}
          positive={true}
        />
        
        <CoinItem 
          icon="🔵"
          name="ETH"
          fullName="Ethereum"
          amount="2.60564"
          value="$4,850.20"
          change={0.2}
          positive={false}
        />
      </div>
    </div>
  );
};

interface CoinItemProps {
  icon: string;
  name: string;
  fullName: string;
  amount: string;
  value: string;
  change: number;
  positive: boolean;
}

const CoinItem = ({ icon, name, fullName, amount, value, change, positive }: CoinItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-800 bg-gray-900/30">
      <div className="flex items-center">
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-800 mr-3">
          <span className="text-lg">{icon}</span>
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-400">{fullName}</div>
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-medium">{amount}</div>
        <div className="flex items-center justify-end mt-1">
          {positive ? (
            <ArrowUpRight className="h-3 w-3 text-accent-green mr-1" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
          )}
          <span 
            className={`text-xs ${
              positive ? 'text-accent-green' : 'text-red-500'
            }`}
          >
            {change}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoinsWidget;