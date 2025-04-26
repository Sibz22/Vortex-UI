import React from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const BalanceWidget = () => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">All Assets</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">24H</span>
          <button className="p-1 bg-gray-800 rounded-md">
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      <h3 className="text-lg font-medium mb-1">My Balance</h3>
      
      <div className="mb-4">
        <div className="text-2xl font-bold">$480,066.00</div>
        <div className="flex items-center mt-1">
          <ArrowUpRight className="h-4 w-4 text-accent-green mr-1" />
          <span className="text-accent-green text-sm mr-1">+$402.25</span>
          <span className="text-xs text-gray-400">(0.6%)</span>
        </div>
      </div>
      
      <div className="h-24 relative">
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewBox="0 0 100 30" 
          className="w-full h-full"
        >
          {/* Gradient fill for chart area */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(74, 222, 128, 0.3)" />
              <stop offset="100%" stopColor="rgba(74, 222, 128, 0)" />
            </linearGradient>
          </defs>
          
          {/* Chart fill area */}
          <path
            d="M0,25 L5,23 L10,24 L15,22 L20,20 L25,21 L30,15 L35,17 L40,16 L45,13 L50,14 L55,9 L60,11 L65,7 L70,5 L75,8 L80,3 L85,2 L90,5 L95,7 L100,5 L100,30 L0,30 Z"
            fill="url(#gradient)"
          />
          
          {/* Chart line */}
          <path
            d="M0,25 L5,23 L10,24 L15,22 L20,20 L25,21 L30,15 L35,17 L40,16 L45,13 L50,14 L55,9 L60,11 L65,7 L70,5 L75,8 L80,3 L85,2 L90,5 L95,7 L100,5"
            className="chart-line"
          />
        </motion.svg>
      </div>
    </div>
  );
};

export default BalanceWidget;