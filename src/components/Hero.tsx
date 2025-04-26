import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="py-20 lg:py-28 relative">
      {/* Background gradient effect */}
      <div className="hero-background"></div>
      
      {/* Decorative curves */}
      <div className="absolute left-0 top-1/2 h-[400px] w-[300px] -translate-y-1/2 -translate-x-1/3">
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewBox="0 0 100 400" 
          className="w-full h-full"
        >
          <path
            d="M100,0 Q20,200 100,400"
            fill="none"
            stroke="rgba(74, 222, 128, 0.2)"
            strokeWidth="1"
          />
        </motion.svg>
      </div>
      
      <div className="absolute right-0 top-1/2 h-[400px] w-[300px] -translate-y-1/2 translate-x-1/3">
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewBox="0 0 100 400" 
          className="w-full h-full"
        >
          <path
            d="M0,0 Q80,200 0,400"
            fill="none"
            stroke="rgba(74, 222, 128, 0.2)"
            strokeWidth="1"
          />
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-accent-green font-medium mb-4"
        >
          Trade Smarter. Grow Faster.
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        >
          Unlock the Full Potential
          <br />
          of Your Crypto Journey
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto"
        >
          Stay ahead of the market with real-time insights, powerful automation,
          and next-level portfolio management—all from one unified dashboard.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <button className="btn-primary text-lg px-8 py-3">TRY NOW</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;