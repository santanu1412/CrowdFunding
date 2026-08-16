import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); // Auto-login after register
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/auth/register', data);
      await login(data.email, data.password);
      toast.success('Identity Created Successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 glass-card border-t-4 border-violet">
        <h2 className="text-3xl font-orbitron font-bold text-center mb-8">New Identity</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Display Name</label>
            <input 
              {...register('name')}
              className="w-full bg-dark/50 border border-white/10 p-3 rounded text-white focus:border-violet outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email Access</label>
            <input 
              {...register('email')}
              type="email"
              className="w-full bg-dark/50 border border-white/10 p-3 rounded text-white focus:border-violet outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Security Key</label>
            <input 
              {...register('password')}
              type="password"
              className="w-full bg-dark/50 border border-white/10 p-3 rounded text-white focus:border-violet outline-none"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full py-3 bg-violet text-white font-bold font-orbitron hover:bg-violet/90 transition-colors"
          >
            {loading ? 'Registering...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already registered? <Link to="/login" className="text-violet hover:underline">Access System</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;