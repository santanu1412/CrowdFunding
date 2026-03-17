import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { campaignSchema } from '../../lib/validators';

const CampaignForm = ({ onSubmit, isLoading }) => {
  const [preview, setPreview] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(campaignSchema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = (data) => {
    onSubmit(data, imageFile);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 glass-card p-8">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2 font-sora">Campaign Title</label>
        <input 
          {...register('title')}
          className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none transition-colors font-sora"
          placeholder="e.g., Cyberpunk Neural Link"
        />
        {errors.title && <span className="text-red-500 text-xs mt-1 block font-sora">{errors.title.message}</span>}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2 font-sora">Category</label>
        <select 
          {...register('category')}
          className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none font-sora"
        >
          <option value="">Select a Sector...</option>
          {['Tech', 'Art', 'Games', 'Music', 'Film', 'Health', 'Environment'].map(c => (
            <option key={c} value={c} className="bg-dark">{c}</option>
          ))}
        </select>
        {errors.category && <span className="text-red-500 text-xs mt-1 block font-sora">{errors.category.message}</span>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2 font-sora">Description</label>
        <textarea 
          {...register('description')}
          className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none h-32 font-sora resize-none"
          placeholder="Detail your vision for the future..."
        />
        {errors.description && <span className="text-red-500 text-xs mt-1 block font-sora">{errors.description.message}</span>}
      </div>

      {/* Goal & Deadline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2 font-sora">Funding Goal ($)</label>
          <input 
            type="number"
            {...register('goalAmount', { valueAsNumber: true })}
            className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none font-sora"
            placeholder="10000"
          />
          {errors.goalAmount && <span className="text-red-500 text-xs mt-1 block font-sora">{errors.goalAmount.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2 font-sora">Deadline</label>
          <input 
            type="date"
            {...register('deadline')}
            className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none font-sora"
          />
          {errors.deadline && <span className="text-red-500 text-xs mt-1 block font-sora">{errors.deadline.message}</span>}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2 font-sora">Cover Image Asset</label>
        <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-cyan/50 transition-colors bg-dark/30">
          <input type="file" onChange={handleImageChange} className="hidden" id="file-upload" accept="image/*" />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded object-cover" />
            ) : (
              <div className="text-gray-500 font-sora">
                <span className="text-cyan font-bold hover:underline">Click to upload</span> or drag and drop
                <p className="text-xs mt-2">PNG, JPG, WEBP up to 5MB</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full py-4 bg-transparent border border-cyan text-cyan font-bold font-orbitron rounded hover:bg-cyan hover:text-dark hover:shadow-neon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
      >
        {isLoading ? 'Initializing Launch Sequence...' : 'Launch Campaign'}
      </button>
    </form>
  );
};

export default CampaignForm;