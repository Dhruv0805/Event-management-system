import api from './api';

export const fetchDashboardStats = () => api.get('/admin/dashboard').then((r) => r.data);
