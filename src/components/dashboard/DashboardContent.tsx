import React, { useState } from 'react';
import { Search, Bell, AlignLeft, Settings, User } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import BalanceWidget from './BalanceWidget';
import CoinsWidget from './CoinsWidget';

interface DashboardContentProps {
  isDemo?: boolean;
}

const DashboardContent = ({ isDemo = false }: DashboardContentProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-background-card">
      {/* Dashboard Header */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        {!isDemo && (
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-800 rounded-xl transition-colors"
            >
              <AlignLeft className="h-5 w-5" />
            </button>
          </div>
        )}
        
        <div className={`flex-1 max-w-md ${isDemo ? '' : 'mx-4'}`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search Crypto"
              className="w-full bg-background-dark py-2 pl-10 pr-4 rounded-lg text-sm border border-gray-800 focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green"
              disabled={isDemo}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-xl hover:bg-gray-800" disabled={isDemo}>
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-xl hover:bg-gray-800" disabled={isDemo}>
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Sidebar - Only shown in authenticated dashboard */}
      {!isDemo && (
        <DashboardSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Dashboard Body */}
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BalanceWidget />
          <CoinsWidget />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;