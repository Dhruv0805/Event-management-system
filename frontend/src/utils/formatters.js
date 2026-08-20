// Small formatting helpers shared across pages/components so date and
// text formatting stays consistent throughout the app.

export const formatDate = (date, options = {}) =>
  new Date(date).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  });

export const formatDateTime = (date) =>
  new Date(date).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const truncate = (text, max = 120) =>
  text && text.length > max ? `${text.slice(0, max)}…` : text;
