import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Coins, LineChart, Lock, Sparkles, Zap, ShieldCheck, AlignLeft, Search, Bell, Settings } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

const InvestmentsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const categories = [
    {
      title: "Structured Products",
      description: "Our proprietary framework-merging fundamental and technical analysis transforms market complexities into opportunities for secure, optimized returns.",
      products: [
        {
          name: "Yield Enhanced Note",
          apy: "12.5%",
          risk: "Low",
          term: "12 months",
          minInvestment: "$10,000",
          gradient: "from-yellow-500 to-orange-600",
        },
        {
          name: "Capital Protected Note",
          apy: "8.2%",
          risk: "Very Low",
          term: "24 months",
          minInvestment: "$25,000",
          gradient: "from-orange-500 to-red-600",
        },
      ]
    },
    {
      title: "Crypto Products",
      description: "Diversified crypto fund leveraging DeFi, quantitative strategies, and crypto investments for long-term growth and venture opportunities.",
      products: [
        {
          name: "DeFi Yield Fund",
          apy: "15.8%",
          risk: "Medium",
          term: "6 months",
          minInvestment: "$5,000",
          gradient: "from-blue-500 to-purple-600",
        },
        {
          name: "Crypto Index Fund",
          apy: "Variable",
          risk: "High",
          term: "3 months",
          minInvestment: "$1,000",
          gradient: "from-purple-500 to-pink-600",
        },
      ]
    },
    {
      title: "Quant Products",
      description: "Our team leverages cutting-edge algorithms and robust models to develop linear, market-neutral strategies that optimize returns while dynamically managing risk.",
      products: [
        {
          name: "Market Neutral Alpha",
          apy: "18.3%",
          risk: "Medium-High",
          term: "1 month",
          minInvestment: "$50,000",
          gradient: "from-green-500 to-teal-600",
        },
        {
          name: "Statistical Arbitrage",
          apy: "21.5%",
          risk: "High",
          term: "3 months",
          minInvestment: "$100,000",
          gradient: "from-teal-500 to-cyan-600",
        },
      ]
    },
  ];

  const features = [
    { icon: <Lock className="w-5 h-5" />, title: "Asset Security" },
    { icon: <Sparkles className="w-5 h-5" />, title: "Smart Portfolio" },
    { icon: <Zap className="w-5 h-5" />, title: "Quick Execution" },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Risk Management" },
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
              placeholder="Search Investments"
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
        activeItem="Investments"
      />

      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Invest in Our Products
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 bg-background-card px-4 py-2 rounded-full border border-gray-800">
                {feature.icon}
                <span className="text-sm">{feature.title}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Product Categories */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-3">{category.title}</h2>
              <p className="text-text-secondary mb-6 max-w-3xl">
                {category.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {category.products.map((product, productIndex) => (
                  <motion.div
                    key={productIndex}
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl border border-gray-800 bg-background-card"
                  >
                    <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${product.gradient}`} />
                    
                    <div className="relative p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                          <div className="flex items-center space-x-2 text-text-secondary">
                            <TrendingUp className="w-4 h-4" />
                            <span>APY: {product.apy}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <LineChart className="w-5 h-5 text-accent-green" />
                          <Coins className="w-5 h-5 text-accent-green" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Risk Level</span>
                          <span>{product.risk}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Lock-in Term</span>
                          <span>{product.term}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Min Investment</span>
                          <span>{product.minInvestment}</span>
                        </div>
                      </div>

                      <button className="w-full mt-6 flex items-center justify-center space-x-2 bg-accent-green hover:bg-accent-green-dark text-black font-medium py-3 rounded-xl transition-colors">
                        <span>Invest Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentsPage;