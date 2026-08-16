import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCampaignStore } from '../store/campaignStore';
import api from '../lib/api';
import toast from 'react-hot-toast';

const CreateCampaign = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const createCampaign = useCampaignStore((state) => state.createCampaign);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (!imageFile) return toast.error('Please upload a cover image');

    try {
      setUploading(true);
      
      // 1. Upload Image
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const uploadRes = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const imageUrl = uploadRes.data.url;

      // 2. Create Campaign
      const campaignData = {
        ...data,
        coverImage: imageUrl,
        goalAmount: Number(data.goalAmount),
        deadline: new Date(data.deadline).toISOString(),
      };

      await createCampaign(campaignData);
      
      toast.success('Campaign launched successfully!');
      navigate('/dashboard');
      
    } catch (error) {
      toast.error(error.message || 'Failed to create campaign');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-orbitron font-bold mb-8 text-center">Launch Your <span className="text-cyan">Vision</span></h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 glass-card p-8">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Campaign Title</label>
          <input 
            {...register('title', { required: 'Title is required' })}
            className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none transition-colors"
            placeholder="e.g., Cyberpunk Neural Link"
          />
          {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
          <select 
            {...register('category', { required: true })}
            className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none"
          >
            {['Tech', 'Art', 'Games', 'Music', 'Film'].map(c => (
              <option key={c} value={c} className="bg-dark">{c}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
          <textarea 
            {...register('description', { required: 'Description is required' })}
            className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none h-32"
            placeholder="Tell us about your project..."
          />
        </div>

        {/* Goal & Deadline */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Goal Amount ($)</label>
            <input 
              type="number"
              {...register('goalAmount', { required: true, min: 10 })}
              className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Deadline</label>
            <input 
              type="date"
              {...register('deadline', { required: true })}
              className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Cover Image</label>
          <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-cyan/50 transition-colors">
            <input type="file" onChange={handleImageChange} className="hidden" id="file-upload" accept="image/*" />
            <label htmlFor="file-upload" className="cursor-pointer">
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded" />
              ) : (
                <span className="text-gray-500">Click to upload image</span>
              )}
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={uploading}
          className="w-full py-4 bg-gradient-to-r from-cyan to-blue-600 font-bold font-orbitron rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {uploading ? 'Initializing Launch Sequence...' : 'LAUNCH CAMPAIGN'}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;