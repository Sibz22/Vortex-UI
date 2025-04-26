import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeDashboard from './components/HomeDashboard';
import AuthDashboard from './components/AuthDashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import UserDetails from './pages/auth/UserDetails';
import AIChatInterface from './components/ai/AIChatInterface';
import InvestmentsPage from './pages/investments/InvestmentsPage';
import CommunityPage from './pages/community/CommunityPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background-dark overflow-hidden">
        <Routes>
          {/* Public Home Page */}
          <Route path="/" element={
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <Navbar />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Hero />
                <HomeDashboard />
              </motion.div>
            </div>
          } />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complete-profile" element={<UserDetails />} />
          
          {/* Protected Dashboard */}
          <Route path="/dashboard" element={<AuthDashboard />} />
          <Route path="/ai" element={<AIChatInterface />} />
          <Route path="/investments" element={<InvestmentsPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App