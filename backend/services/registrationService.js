const Event = require('../models/Event');
const Registration = require('../models/Registration');
const ApiError = require('../utils/apiError');

// Validates all registration business rules described in the project docs:
// no duplicates, no registering after the deadline, and no overbooking.
const validateRegistration = async (userId, eventId) => {
  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, 'Event not found');

  if (event.status === 'cancelled' || event.status === 'completed') {
    throw new ApiError(400, 'Registration is closed for this event');
  }

  if (new Date() > new Date(event.registrationDeadline)) {
    throw new ApiError(400, 'Registration deadline has passed');
  }

  const existing = await Registration.findOne({ userId, eventId, status: { $ne: 'cancelled' } });
  if (existing) {
    throw new ApiError(409, 'You are already registered for this event');
  }

  const confirmedCount = await Registration.countDocuments({ eventId, status: 'confirmed' });
  if (confirmedCount >= event.capacity) {
    throw new ApiError(400, 'This event has reached full capacity');
  }

  return event;
};

module.exports = { validateRegistration };
