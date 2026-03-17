import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import Card from '../components/ui/Card';

const Register = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 w-full">
      <Card className="w-full max-w-md p-8 border-t-4 border-t-violet">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-orbitron font-bold text-white mb-2 uppercase tracking-wider">New Identity</h2>
          <p className="text-sm text-gray-400 font-sora">Forge your profile on the network.</p>
        </div>
        
        <RegisterForm />
        
        <p className="mt-6 text-center text-sm text-gray-500 font-sora">
          Already registered? <Link to="/login" className="text-violet hover:underline transition-all">Access System</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;