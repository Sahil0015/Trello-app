import api from './axios';

// ===== LABELS =====
export const getLabels = () => api.get('/labels/');

export const createLabel = (name, color) => 
  api.post('/labels/', { name, color });

export const deleteLabel = (labelId) => 
  api.delete(`/labels/${labelId}`);

// ===== MEMBERS =====
export const getMembers = () => api.get('/members/');

export const createMember = (name, email, avatarColor) => 
  api.post('/members/', { name, email, avatar_color: avatarColor });

export const deleteMember = (memberId) => 
  api.delete(`/members/${memberId}`);
