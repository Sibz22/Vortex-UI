import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Globe2, Briefcase, CreditCard, Upload, Camera } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';

const step1Schema = z.object({
  country: z.string().min(1, 'Please select your country'),
  address: z.string().min(10, 'Please enter your complete address'),
  birthdate: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  }, 'You must be at least 18 years old'),
});

const step2Schema = z.object({
  panNumber: z.string()
    .length(10, 'PAN number must be exactly 10 digits')
    .regex(/^\d{10}$/, 'PAN number must be 10 digits'),
  employment: z.string().min(1, 'Please select your employment status'),
});

const step3Schema = z.object({
  aadharFile: z.any(),
  passportFile: z.any(),
  selfieFile: z.any(),
});

const userDetailsSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type UserDetailsFormData = z.infer<typeof userDetailsSchema>;

const employmentOptions = [
  'Salaried',
  'Self-Employed',
  'Business Owner',
  'Student',
  'Retired',
  'Unemployed',
  'Other'
];

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Japan', 'Singapore', 'South Korea', 'India',
  'Brazil', 'Mexico', 'Spain', 'Italy', 'Netherlands',
  'Sweden', 'Norway', 'Denmark', 'Finland', 'New Zealand'
].sort();

const UserDetails = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserDetailsFormData>>({});

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData,
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      ...formData,
      panNumber: '1234567890', // Pre-filled dummy PAN number (10 digits)
    },
  });

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: formData,
  });

  const onStep1Submit = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const onStep2Submit = (data: Step2Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
  };

  const onStep3Submit = (data: Step3Data) => {
    const finalData = { ...formData, ...data };
    console.log('Complete form data:', finalData);
    navigate('/dashboard');
  };

  const getCurrentForm = () => {
    switch (step) {
      case 1:
        return {
          form: step1Form,
          onSubmit: onStep1Submit,
        };
      case 2:
        return {
          form: step2Form,
          onSubmit: onStep2Submit,
        };
      case 3:
        return {
          form: step3Form,
          onSubmit: onStep3Submit,
        };
      default:
        return {
          form: step1Form,
          onSubmit: onStep1Submit,
        };
    }
  };

  const { form, onSubmit } = getCurrentForm();
  const { register, handleSubmit, formState: { errors } } = form;

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
            <p className="text-text-secondary mb-6">
              Please provide your basic details to get started.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Country of Residence</label>
                <div className="relative">
                  <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <select
                    {...register('country')}
                    className="w-full bg-background-dark pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green appearance-none"
                  >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Legal Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
                  <textarea
                    {...register('address')}
                    rows={3}
                    className="w-full bg-background-dark pl-10 pr-4 py-2 rounded-xl border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green"
                    placeholder="Enter your complete address"
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="date"
                    {...register('birthdate')}
                    className="w-full bg-background-dark pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green"
                  />
                </div>
                {errors.birthdate && (
                  <p className="text-red-500 text-sm mt-1">{errors.birthdate.message}</p>
                )}
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold mb-2">Professional Details</h2>
            <p className="text-text-secondary mb-6">
              Please provide your PAN and employment information.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">PAN Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    {...register('panNumber')}
                    className="w-full bg-background-dark pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green"
                    placeholder="Enter 10 digit number"
                    maxLength={10}
                  />
                </div>
                {errors.panNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.panNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Employment Status</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <select
                    {...register('employment')}
                    className="w-full bg-background-dark pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-accent-green focus:ring-1 focus:ring-accent-green appearance-none"
                  >
                    <option value="">Select employment status</option>
                    {employmentOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.employment && (
                  <p className="text-red-500 text-sm mt-1">{errors.employment.message}</p>
                )}
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold mb-2">Identity Verification</h2>
            <p className="text-text-secondary mb-6">
              Please upload clear photos of your identity documents.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Aadhar Card</label>
                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <label className="flex items-center justify-center w-full h-32 px-4 transition bg-background-dark border-2 border-gray-800 border-dashed rounded-xl appearance-none cursor-pointer hover:border-accent-green focus:outline-none">
                        <div className="flex flex-col items-center space-y-2">
                          <Upload className="w-8 h-8 text-gray-500" />
                          <span className="text-sm text-gray-500">Upload Aadhar Card</span>
                        </div>
                        <input
                          type="file"
                          {...register('aadharFile')}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Passport</label>
                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <label className="flex items-center justify-center w-full h-32 px-4 transition bg-background-dark border-2 border-gray-800 border-dashed rounded-xl appearance-none cursor-pointer hover:border-accent-green focus:outline-none">
                        <div className="flex flex-col items-center space-y-2">
                          <Upload className="w-8 h-8 text-gray-500" />
                          <span className="text-sm text-gray-500">Upload Passport</span>
                        </div>
                        <input
                          type="file"
                          {...register('passportFile')}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Selfie</label>
                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <label className="flex items-center justify-center w-full h-32 px-4 transition bg-background-dark border-2 border-gray-800 border-dashed rounded-xl appearance-none cursor-pointer hover:border-accent-green focus:outline-none">
                        <div className="flex flex-col items-center space-y-2">
                          <Camera className="w-8 h-8 text-gray-500" />
                          <span className="text-sm text-gray-500">Upload Selfie</span>
                        </div>
                        <input
                          type="file"
                          {...register('selfieFile')}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex">
      <BackButton />
      
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-background-card rounded-3xl p-8 border border-gray-800">
            <div className="flex items-center space-x-2 mb-8">
              {[1, 2, 3].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber
                        ? 'bg-accent-green text-black'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`flex-1 h-0.5 ${
                        step > stepNumber ? 'bg-accent-green' : 'bg-gray-800'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent()}

              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2 rounded-xl border border-gray-800 hover:bg-gray-800 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="ml-auto bg-accent-green hover:bg-accent-green-dark text-black font-medium px-6 py-2 rounded-xl transition-colors"
                >
                  {step === 3 ? 'Complete Profile' : 'Continue'}
                </button>
              </div>
            </form>
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
            src="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg"
            alt="Complete Profile"
            className="rounded-3xl mb-8 border border-gray-800"
          />
          <h3 className="text-2xl font-bold mb-4">Almost There!</h3>
          <p className="text-text-secondary">
            Help us provide you with the best trading experience by completing your profile information.
            Your data is protected by our advanced security measures.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetails;