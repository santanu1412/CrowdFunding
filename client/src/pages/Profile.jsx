import { useAuthStore } from '../store/authStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Profile = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto pt-8 pb-20 w-full">
      <h1 className="text-4xl font-orbitron font-bold mb-10 text-white uppercase tracking-widest">
        Identity <span className="text-violet">Settings</span>
      </h1>

      <Card className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8 border-b border-white/10 pb-8">
          <div className="relative">
            <img 
              src={user.avatar || 'https://res.cloudinary.com/demo/image/upload/v1631700000/default-avatar.png'} 
              alt="Avatar" 
              className="w-32 h-32 rounded-full border-4 border-dark outline outline-2 outline-violet/50 object-cover" 
            />
            <div className="absolute bottom-0 right-0 bg-violet text-white text-xs px-2 py-1 rounded font-bold font-orbitron uppercase">
              {user.role}
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold font-orbitron text-white">{user.name}</h2>
            <p className="text-gray-400 font-sora mt-1">{user.email}</p>
            <p className="text-xs text-gray-500 font-sora mt-2">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <form className="space-y-6 font-sora" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Display Designation</label>
            <input 
              type="text" 
              defaultValue={user.name}
              className="w-full bg-dark/50 border border-white/10 p-3 rounded text-white focus:border-violet outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Biography Data</label>
            <textarea 
              defaultValue={user.bio || ''}
              placeholder="Enter your system bio..."
              className="w-full bg-dark/50 border border-white/10 p-3 rounded text-white focus:border-violet outline-none transition-colors h-24 resize-none"
            />
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button variant="secondary" type="button">Update Identity</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;