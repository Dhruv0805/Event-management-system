import api from './api';

export const fetchProfile = () => api.get('/users/profile').then((r) => r.data);
export const updateProfile = (payload) => api.put('/users/profile', payload).then((r) => r.data);
export const fetchUsers = (params = {}) => api.get('/users', { params }).then((r) => r.data);
export const fetchUserById = (id) => api.get(`/users/${id}`).then((r) => r.data);
export const updateUserStatus = (id, status) =>
  api.put(`/users/${id}/status`, { status }).then((r) => r.data);
