import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { registerSchema } from '../../lib/validators';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/api';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // 1. Create the user identity
      await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      
      // 2. Automatically log them in
      await login(data.email, data.password);
      
      toast.success('Identity forged successfully.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2 font-sora">
          Display Designation
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder="e.g. Neo"
          className={`w-full bg-dark/50 border ${
            errors.name ? 'border-red-500' : 'border-white/10 focus:border-violet'
          } rounded-lg p-3 text-white outline-none transition-colors duration-300 font-sora`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500 font-sora">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2 font-sora">
          Email Identity
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="user@nexus.io"
          className={`w-full bg-dark/50 border ${
            errors.email ? 'border-red-500' : 'border-white/10 focus:border-violet'
          } rounded-lg p-3 text-white outline-none transition-colors duration-300 font-sora`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500 font-sora">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2 font-sora">
          Security Key
        </label>
        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
          className={`w-full bg-dark/50 border ${
            errors.password ? 'border-red-500' : 'border-white/10 focus:border-violet'
          } rounded-lg p-3 text-white outline-none transition-colors duration-300 font-sora`}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500 font-sora">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 mt-4 bg-transparent border border-violet text-violet font-bold font-orbitron rounded hover:bg-violet hover:text-white hover:shadow-violet transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
      >
        {isLoading ? 'Forging Identity...' : 'Create Account'}
      </button>
    </form>
  );
};

export default RegisterForm;