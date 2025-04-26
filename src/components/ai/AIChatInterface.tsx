import React, { useState } from 'react';
import { Send, Bot, FileText, PieChart, LayoutGrid, Wallet, AlignLeft, Search, Bell, Settings } from 'lucide-react';
import DashboardSidebar from '../dashboard/DashboardSidebar';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

const AIChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { type: 'user', content: input }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: "I'm analyzing your investment strategy. Based on current market conditions, I recommend diversifying your portfolio with a mix of stable and growth assets."
      }]);
    }, 1000);

    setInput('');
  };

  const quickActions = [
    { icon: <FileText size={24} />, title: 'Investment report', description: 'Get detailed analysis' },
    { icon: <PieChart size={24} />, title: 'Portfolio analytics', description: 'View performance metrics' },
    { icon: <LayoutGrid size={24} />, title: 'Investment planning', description: 'Plan your strategy' },
    { icon: <Wallet size={24} />, title: 'Returns on Investments', description: 'Track your ROI' },
  ];

  return (
    <div className="flex flex-col h-screen bg-background-dark">
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
              placeholder="Search AI Assistant"
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

      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        activeItem="2Cents AI"
      />

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="space-y-8">
            <div className="text-center pt-8">
              <div className="inline-block p-4 rounded-full bg-accent-green/10 mb-4">
                <Bot className="h-8 w-8 text-accent-green" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to 2Cents AI</h2>
              <p className="text-text-secondary max-w-md mx-auto">
                Your personal AI assistant for smarter trading decisions and portfolio management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto px-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center p-6 rounded-2xl bg-background-card border border-gray-800 hover:border-accent-green/50 transition-all"
                >
                  <div className="p-3 rounded-xl bg-accent-green/10 text-accent-green mb-3">
                    {action.icon}
                  </div>
                  <h3 className="font-medium mb-1">{action.title}</h3>
                  <p className="text-sm text-text-secondary">{action.description}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-accent-green text-black'
                    : 'bg-background-card border border-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full bg-background-card rounded-xl py-3 pl-4 pr-12 border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent-green hover:text-accent-green-dark"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-xs text-center mt-2 text-text-secondary">
          A line of disclaimer for the investor regarding AI advices
        </p>
      </div>
    </div>
  );
};

export default AIChatInterface;