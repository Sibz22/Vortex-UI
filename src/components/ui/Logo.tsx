import React from 'react';
import { motion } from 'framer-motion';
import { Vote as Vortex } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <motion.div
      className="flex items-center text-xl font-bold"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Link to="/" className="flex items-center">
        <Vortex className="h-8 w-8 text-accent-green mr-2" />
        <span>Vortex</span>
      </Link>
    </motion.div>
  );
};

export default Logo;