import React, { useEffect, useRef } from 'react';
import { LayoutDashboard, Briefcase, Bot, Users, AlignLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem?: string;
}

const DashboardSidebar = ({ isOpen, onClose, activeItem }: DashboardSidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
          
          {/* Sidebar */}
          <motion.div
            ref={sidebarRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-64 bg-background-card border-r border-gray-800 z-50"
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-accent-green flex items-center justify-center">
                  <span className="text-black font-bold">S</span>
                </div>
                <div>
                  <p className="font-medium">Shibashis</p>
                  <p className="text-xs text-accent-green">Verified account</p>
                </div>
              </div>
              <button onClick={onClose} className="lg:hidden">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="text-xs text-gray-500 mb-4">YOUR</div>
              <nav className="space-y-2">
                <Link to="/dashboard">
                  <SidebarItem 
                    icon={<LayoutDashboard />} 
                    label="Portfolio" 
                    active={activeItem === 'Portfolio'} 
                  />
                </Link>
                <Link to="/ai">
                  <SidebarItem 
                    icon={<Bot />} 
                    label="2Cents AI" 
                    active={activeItem === '2Cents AI'}
                  />
                </Link>
              </nav>

              <div className="text-xs text-gray-500 mt-6 mb-4">EXPLORE</div>
              <nav className="space-y-2">
                <Link to="/investments">
                  <SidebarItem 
                    icon={<Briefcase />} 
                    label="Investments" 
                    active={activeItem === 'Investments'} 
                  />
                </Link>
                <Link to="/community">
                  <SidebarItem 
                    icon={<Users />} 
                    label="Community" 
                    active={activeItem === 'Community'} 
                  />
                </Link>
              </nav>

              <div className="absolute bottom-8 left-4 right-4">
                <div className="p-4 rounded-xl bg-background-dark border border-gray-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-500"></div>
                    <span className="font-medium">2Cents Capital</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">
                    Redefining alpha with technology, data, and precision.
                  </p>
                  <div className="flex space-x-3">
                    <a href="#" className="p-2 rounded-lg bg-background-card hover:bg-gray-800">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" 
                           alt="YouTube" className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-2 rounded-lg bg-background-card hover:bg-gray-800">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" 
                           alt="LinkedIn" className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  className?: string;
}

const SidebarItem = ({ icon, label, active = false }: SidebarItemProps) => {
  return (
    <button
      className={`flex items-center space-x-3 w-full p-3 rounded-xl transition-all ${
        active
          ? 'bg-gray-800 text-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default DashboardSidebar;