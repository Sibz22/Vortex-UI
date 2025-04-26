import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, AlignLeft, TrendingUp, Eye, DollarSign, Share2, Search, Bell, Settings } from 'lucide-react';
import DashboardSidebar from './dashboard/DashboardSidebar';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface ContentItem {
  id: string;
  title: string;
  description: string;
  earnings: number;
  views: number;
  image: string;
}

const AuthDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totalEarned = 128239.00;
  const nonProfitCount = 124;

  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'The First Encounter',
      description: 'Embark on a global adventure, following filmmaker Richard Clarke and UN...',
      earnings: 252230,
      views: 32,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'
    },
    {
      id: '2',
      title: 'Notorious Adventures',
      description: 'Embark on a journey through the untamed wilderness of Alaska...',
      earnings: 252230,
      views: 28,
      image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg'
    }
  ];

  const purchasesData = {
    labels: ['Apr 14', 'Apr 21', 'Apr 28', 'May 5', 'May 12'],
    datasets: [
      {
        fill: true,
        label: 'Purchases',
        data: [10, 25, 15, 30, 45],
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      }
    ]
  };

  const pageViewsData = {
    labels: ['Mobile', 'Desktop', 'Tablet'],
    datasets: [{
      data: [300, 450, 200],
      backgroundColor: [
        'rgba(74, 222, 128, 0.8)',
        'rgba(74, 222, 128, 0.5)',
        'rgba(74, 222, 128, 0.2)',
      ],
      borderColor: '#111111',
      borderWidth: 2,
    }]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#a3a3a3',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#a3a3a3',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return value.toLocaleString();
          }
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: '#ffffff',
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      }
    },
  };

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-800 rounded-xl transition-colors"
          >
            <AlignLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search Portfolio"
              className="w-full bg-background-dark py-2 pl-10 pr-4 rounded-lg text-sm border border-gray-800 focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-xl hover:bg-gray-800">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-xl hover:bg-gray-800">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        activeItem="Portfolio"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-6">Portfolio Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Earned Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-text-secondary mb-1">Total Earned</h2>
                  <div className="text-4xl font-bold">${totalEarned.toLocaleString()}</div>
                </div>
                <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors">
                  Withdraw funds
                </button>
              </div>
              <div className="flex items-center text-accent-green text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+12.5% from last month</span>
              </div>
            </div>

            {/* Non-Profits Card */}
            <div className="bg-gradient-to-br from-accent-green/10 to-accent-green/5 rounded-3xl p-6 border border-accent-green/20">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-text-secondary mb-1">Non-Profits</h2>
                  <div className="text-4xl font-bold">{nonProfitCount}</div>
                  <div className="text-text-secondary text-sm mt-2">
                    Your content consumption rate
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-accent-green/20 border-2 border-background-dark" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Purchases Chart */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold">Purchases over time</h2>
              <TrendingUp className="h-5 w-5 text-accent-green" />
            </div>
            <div className="h-64">
              <Line data={purchasesData} options={lineChartOptions} />
            </div>
          </div>

          {/* Page Views Chart */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold">Page Views Distribution</h2>
              <Eye className="h-5 w-5 text-accent-green" />
            </div>
            <div className="h-64">
              <Pie data={pageViewsData} options={pieChartOptions} />
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Your content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contentItems.map((item) => (
              <div 
                key={item.id}
                className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-gray-800 overflow-hidden hover:border-accent-green transition-colors"
              >
                <div className="relative h-48">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-text-secondary mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-accent-green mr-1" />
                        <span>{item.earnings.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-text-secondary mr-1" />
                        <span className="text-text-secondary">{item.views}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthDashboard;