import api from './axios';

export const getLabels = () => api.get('/labels/');

export const createLabel = (name, color) => 
  api.post('/labels/', { name, color });

export const deleteLabel = (labelId) => 
  api.delete(`/labels/${labelId}`);

export const getMembers = () => api.get('/members/');
