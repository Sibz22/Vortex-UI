import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must include uppercase, lowercase, number and special character'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log('Signup data:', data);
    navigate('/complete-profile');
  };

  return (
    <div className="min-h-screen bg-background-dark flex">
      <BackButton />
      {/* Left side - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex w-1/2 bg-background-card items-center justify-center border-r border-gray-800"
      >
        <div className="max-w-md p-8 text-center">
          <img
            src="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg"
            alt="Secure Signup"
            className="rounded-3xl mb-8 border border-gray-800"
          />
          <h3 className="text-2xl font-bold mb-4">Welcome to Vortex</h3>
          <p className="text-text-secondary">
            Join thousands of traders who trust our platform for secure and efficient
            cryptocurrency trading with advanced security features.
          </p>
        </div>
      </motion.div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-background-card rounded-3xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Create an account</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    {...register('fullName')}
                    className="w-full bg-background-dark pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green"
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full bg-background-dark pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green"
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className="w-full bg-background-dark pl-10 pr-12 py-3 rounded-xl border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    className="w-full bg-background-dark pl-10 pr-12 py-3 rounded-xl border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-gray-800 text-accent-green focus:ring-accent-green"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-text-secondary">
                  I agree to the{' '}
                  <a href="#" className="text-accent-green hover:text-accent-green-dark">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-accent-green hover:text-accent-green-dark">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-accent-green hover:bg-accent-green-dark text-black font-medium py-3 rounded-xl transition-colors"
              >
                Create Account
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-accent-green hover:text-accent-green-dark">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;