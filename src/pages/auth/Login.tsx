import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const twoFactorSchema = z.object({
  code: z.string().length(6, 'Code must be exactly 6 digits').regex(/^\d+$/, 'Code must contain only numbers'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type TwoFactorFormData = z.infer<typeof twoFactorSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const navigate = useNavigate();
  
  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { register: register2FA, handleSubmit: handle2FASubmit, formState: { errors: twoFactorErrors } } = useForm<TwoFactorFormData>({
    resolver: zodResolver(twoFactorSchema),
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    console.log('Login data:', data);
    setIsVerifying2FA(true);
  };

  const on2FASubmit = async (data: TwoFactorFormData) => {
    console.log('2FA code:', data);
    navigate('/complete-profile');
  };

  if (isVerifying2FA) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center p-4">
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-background-card rounded-3xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Two-Factor Authentication</h2>
            <p className="text-text-secondary mb-6">
              Enter the verification code from your authenticator app or email.
            </p>
            
            <form onSubmit={handle2FASubmit(on2FASubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  {...register2FA('code')}
                  placeholder="6-digit code"
                  className="w-full bg-background-dark px-4 py-3 rounded-xl border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green"
                  maxLength={6}
                />
                {twoFactorErrors.code && (
                  <p className="text-red-500 text-sm mt-1">{twoFactorErrors.code.message}</p>
                )}
              </div>
              
              <button 
                type="submit"
                className="w-full bg-accent-green hover:bg-accent-green-dark text-black font-medium py-3 rounded-xl transition-colors"
              >
                Verify Code
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark flex">
      <BackButton />
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-background-card rounded-3xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Log in to your account</h2>
            
            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="email"
                    {...registerLogin('email')}
                    className="w-full bg-background-dark pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green"
                    placeholder="your.email@example.com"
                  />
                </div>
                {loginErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{loginErrors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...registerLogin('password')}
                    className="w-full bg-background-dark pl-10 pr-12 py-3 rounded-xl border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{loginErrors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-800 text-accent-green focus:ring-accent-green" />
                  <span className="ml-2 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-sm text-accent-green hover:text-accent-green-dark">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-accent-green hover:bg-accent-green-dark text-black font-medium py-3 rounded-xl transition-colors"
              >
                Log In
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link to="/signup" className="text-accent-green hover:text-accent-green-dark">
                Create account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right side - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex w-1/2 bg-background-card items-center justify-center border-l border-gray-800"
      >
        <div className="max-w-md p-8 text-center">
          <img
            src="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg"
            alt="Secure Login"
            className="rounded-3xl mb-8 border border-gray-800"
          />
          <h3 className="text-2xl font-bold mb-4">Enhanced Security</h3>
          <p className="text-text-secondary">
            Your account is protected with industry-leading security measures including
            two-factor authentication and Microsoft Authenticator integration.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;