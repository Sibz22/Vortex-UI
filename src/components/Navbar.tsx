import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './ui/Logo';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-4 relative z-50"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Logo />
            <div className="hidden md:flex ml-12 space-x-1">
              <NavLink href="#" label="Buy Crypto" />
              <NavLink href="#" label="Markets" />
              <NavLink href="#" label="Trade" hasDropdown />
              <NavLink href="#" label="Futures" />
              <NavLink href="#" label="Earn" />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login" className="nav-link">Log In</Link>
            <Link to="/signup" className="btn-primary">Sign Up</Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-background-card glass-effect py-4 px-6 mt-2 rounded-xl z-50 border border-gray-800"
        >
          <div className="flex flex-col space-y-4">
            <NavLink href="#" label="Buy Crypto" mobile />
            <NavLink href="#" label="Markets" mobile />
            <NavLink href="#" label="Trade" hasDropdown mobile />
            <NavLink href="#" label="Futures" mobile />
            <NavLink href="#" label="Earn" mobile />
            <div className="pt-4 border-t border-gray-800 flex flex-col space-y-3">
              <Link to="/login" className="w-full text-left py-2 text-text-primary font-medium">
                Log In
              </Link>
              <Link to="/signup" className="btn-primary w-full text-center">
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
  hasDropdown?: boolean;
  mobile?: boolean;
}

const NavLink = ({ href, label, hasDropdown = false, mobile = false }: NavLinkProps) => {
  if (mobile) {
    return (
      <a href={href} className="flex items-center justify-between py-2 text-text-primary font-medium">
        {label}
        {hasDropdown && <ChevronDown size={16} />}
      </a>
    );
  }

  return (
    <a href={href} className="nav-link flex items-center">
      {label}
      {hasDropdown && <ChevronDown size={16} className="ml-1" />}
    </a>
  );
};

export default Navbar;