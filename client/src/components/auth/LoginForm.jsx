import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { loginSchema } from '../../lib/validators';
import { useAuthStore } from '../../store/authStore';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('System access granted. Welcome back.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Invalid credentials. Access denied.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            errors.email ? 'border-red-500' : 'border-white/10 focus:border-cyan'
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
            errors.password ? 'border-red-500' : 'border-white/10 focus:border-cyan'
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
        className="w-full py-3 mt-4 bg-transparent border border-cyan text-cyan font-bold font-orbitron rounded hover:bg-cyan hover:text-dark hover:shadow-neon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
      >
        {isLoading ? 'Authenticating...' : 'Initialize Session'}
      </button>
    </form>
  );
};

export default LoginForm;