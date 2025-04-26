import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BackButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-6 left-6"
    >
      <Link
        to="/"
        className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-background-dark hover:bg-gray-800 border border-gray-800 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Back</span>
      </Link>
    </motion.div>
  );
};

export default BackButton;