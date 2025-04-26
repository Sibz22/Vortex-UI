import React from 'react';
import { motion } from 'framer-motion';
import DashboardContent from './dashboard/DashboardContent';

const HomeDashboard = () => {
  return (
    <section className="pb-20 lg:pb-28 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="platform-glow border-gradient max-w-5xl mx-auto"
      >
        <div className="bg-background-card rounded-3xl overflow-hidden border border-gray-800">
          <DashboardContent isDemo={true} />
        </div>
      </motion.div>
    </section>
  );
};

export default HomeDashboard;