import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'technology',
    goal: '',
    endDate: '',
    story: '',
    rewards: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submission logic
  };

  return (
    <div className="create-campaign-form">
      <h2>Start Your Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Campaign Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Funding Goal ($)</label>
            <input
              type="number"
              value={formData.goal}
              onChange={(e) => setFormData({...formData, goal: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Campaign Story</label>
          <RichTextEditor
            content={formData.story}
            onChange={(content) => setFormData({...formData, story: content})}
          />
        </div>

        <button type="submit" className="submit-button">
          Launch Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;