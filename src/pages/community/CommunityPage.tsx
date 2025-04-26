import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronRight, AlignLeft, MessageSquare, Search, Bell, Settings } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

interface NewsItem {
  source: string;
  title: string;
  timeAgo: string;
  imageUrl: string;
}

interface CalendarEvent {
  date: number;
  hasEvent?: boolean;
}

const CommunityPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(16);

  const newsItems: NewsItem[] = [
    {
      source: "CryptoNews",
      title: "Bitcoin reaches new all-time high as institutional adoption grows",
      timeAgo: "2 hours ago",
      imageUrl: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg"
    },
    {
      source: "Trading View",
      title: "Technical Analysis: ETH/USD shows bullish divergence",
      timeAgo: "4 hours ago",
      imageUrl: "https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg"
    },
    {
      source: "Market Watch",
      title: "DeFi tokens surge as new protocol launches",
      timeAgo: "5 hours ago",
      imageUrl: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg"
    },
    {
      source: "Crypto Daily",
      title: "Major exchange announces new trading features",
      timeAgo: "16 hours ago",
      imageUrl: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg"
    }
  ];

  const calendar: CalendarEvent[][] = [
    [{ date: 1 }, { date: 2 }, { date: 3 }, { date: 4 }, { date: 5 }],
    [{ date: 6 }, { date: 7 }, { date: 8 }, { date: 9 }, { date: 10, hasEvent: true }, { date: 11 }, { date: 12 }],
    [{ date: 13 }, { date: 14 }, { date: 15 }, { date: 16, hasEvent: true }, { date: 17 }, { date: 18 }, { date: 19 }],
    [{ date: 20 }, { date: 21 }, { date: 22 }, { date: 23 }, { date: 24 }, { date: 25 }, { date: 26 }],
    [{ date: 27 }, { date: 28 }, { date: 29 }, { date: 30 }]
  ];

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Header */}
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
              placeholder="Search Community"
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
        activeItem="Community"
      />

      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market News Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 rounded-3xl p-6 border border-gray-800"
          >
            <h2 className="text-2xl font-bold mb-6">Market News Highlight</h2>
            <div className="space-y-4">
              {newsItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background-card rounded-xl p-4 border border-gray-800 hover:border-accent-green transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="text-sm text-text-secondary mb-2">{item.source}</div>
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      <div className="text-sm text-text-secondary">{item.timeAgo}</div>
                    </div>
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Financial Calendar Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background-card rounded-3xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Financial Calendar</h2>
                <p className="text-text-secondary text-sm">All important events summarized</p>
              </div>
              <CalendarIcon className="h-6 w-6 text-accent-green" />
            </div>

            <div className="mb-6">
              <div className="text-xl font-bold mb-4">APRIL</div>
              <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-text-secondary text-sm">{day}</div>
                ))}
              </div>
              {calendar.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-2">
                  {week.map((day, dayIndex) => (
                    <button
                      key={dayIndex}
                      onClick={() => setSelectedDate(day.date)}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center text-sm
                        ${day.date === selectedDate ? 'bg-accent-green text-black' : 'hover:bg-gray-800'}
                        ${day.hasEvent ? 'font-bold' : ''}
                      `}
                    >
                      {day.date}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <button className="w-full bg-gray-800 hover:bg-gray-700 rounded-xl py-2 px-4 text-sm flex items-center justify-between transition-colors">
              <span>EVENTS</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Community Discussion Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-background-card rounded-3xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Community Discussion</h2>
                <p className="text-text-secondary text-sm">Join the conversation with fellow traders</p>
              </div>
              <MessageSquare className="h-6 w-6 text-accent-green" />
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 mb-4">
              <textarea
                placeholder="Share your thoughts with the community..."
                className="w-full bg-transparent border-none focus:ring-0 resize-none"
                rows={3}
              />
            </div>

            <button className="w-full bg-gray-800 hover:bg-gray-700 rounded-xl py-2 px-4 text-sm flex items-center justify-between transition-colors">
              <span>DISCUSS</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;