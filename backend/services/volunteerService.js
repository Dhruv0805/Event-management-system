const Event = require('../models/Event');
const ApiError = require('../utils/apiError');

// Confirms the parent event exists before creating/updating an
// event-scoped volunteer record.
const ensureEventExists = async (eventId) => {
  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, 'Event not found');
  return event;
};

module.exports = { ensureEventExists };
