import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createCampaign } from '../services/api';

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: ''
  });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCampaign(formData);
      history.push('/');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <div className="create-form">
      <h2>Create New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <label>Description</label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <label>Target Amount ($)</label>
        <input
          type="number"
          required
          min="1"
          value={formData.target}
          onChange={(e) => setFormData({ ...formData, target: e.target.value })}
        />

        <label>Deadline</label>
        <input
          type="date"
          required
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        />

        <button type="submit">Launch Campaign</button>
      </form>
    </div>
  );
};

export default CreateCampaign;