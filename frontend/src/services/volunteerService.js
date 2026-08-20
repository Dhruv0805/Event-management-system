import api from './api';

export const fetchVolunteers = (eventId) =>
  api.get('/volunteers', { params: eventId ? { eventId } : {} }).then((r) => r.data);
export const createVolunteer = (payload) => api.post('/volunteers', payload).then((r) => r.data);
export const updateVolunteer = (id, payload) =>
  api.put(`/volunteers/${id}`, payload).then((r) => r.data);
export const deleteVolunteer = (id) => api.delete(`/volunteers/${id}`).then((r) => r.data);
