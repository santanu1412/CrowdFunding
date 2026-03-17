import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import Card from '../components/ui/Card';

const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 w-full">
      <Card className="w-full max-w-md p-8 border-t-4 border-t-cyan">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-orbitron font-bold text-white mb-2 uppercase tracking-wider">System Login</h2>
          <p className="text-sm text-gray-400 font-sora">Authenticate to access the grid.</p>
        </div>
        
        <LoginForm />
        
        <p className="mt-6 text-center text-sm text-gray-500 font-sora">
          New to Nexus? <Link to="/register" className="text-cyan hover:underline transition-all">Register Identity</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;