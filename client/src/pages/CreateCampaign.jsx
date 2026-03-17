import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaignStore } from '../store/campaignStore';
import CampaignForm from '../components/campaigns/CampaignForm';
import api from '../lib/api';
import toast from 'react-hot-toast';

const CreateCampaign = () => {
  const [isUploading, setIsUploading] = useState(false);
  const createCampaign = useCampaignStore((state) => state.createCampaign);
  const navigate = useNavigate();

  const handleCampaignSubmit = async (data, imageFile) => {
    if (!imageFile) return toast.error('Cover image asset is required.');

    try {
      setIsUploading(true);
      
      // 1. Upload the image to Cloudinary via backend
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const uploadRes = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const imageUrl = uploadRes.data.url;

      // 2. Format payload and dispatch to Zustand store
      const campaignPayload = {
        ...data,
        coverImage: imageUrl,
        deadline: new Date(data.deadline).toISOString(),
      };

      await createCampaign(campaignPayload);
      
      toast.success('Protocol deployed successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to initialize campaign.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-orbitron font-bold text-white uppercase tracking-widest mb-2">
          Launch <span className="text-cyan">Protocol</span>
        </h1>
        <p className="text-gray-400 font-sora text-sm">Deploy your vision to the global network.</p>
      </div>
      
      <CampaignForm onSubmit={handleCampaignSubmit} isLoading={isUploading} />
    </div>
  );
};

export default CreateCampaign;