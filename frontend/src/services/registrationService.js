import api from './api';

export const registerForEvent = (eventId) =>
  api.post('/registrations', { eventId }).then((r) => r.data);
export const fetchMyRegistrations = () => api.get('/registrations').then((r) => r.data);
// Admin call: same endpoint, but the backend returns ALL registrations
// (not just the caller's) when the authenticated account is an Admin.
export const fetchAllRegistrations = (params = {}) =>
  api.get('/registrations', { params }).then((r) => r.data);
export const fetchEventRegistrations = (eventId) =>
  api.get('/registrations', { params: { eventId } }).then((r) => r.data);
export const cancelRegistration = (id) => api.delete(`/registrations/${id}`).then((r) => r.data);
