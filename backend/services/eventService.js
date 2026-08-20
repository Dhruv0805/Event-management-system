const Event = require('../models/Event');
const Registration = require('../models/Registration');
const ApiError = require('../utils/apiError');

// Business rules for events live here so controllers stay thin and the
// rules can be reused (e.g. by an admin report) without duplicating logic.

const buildEventFilter = ({ category, status, search }) => {
  const filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { venue: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  return filter;
};

const getEventOrThrow = async (id) => {
  const event = await Event.findById(id).populate('category', 'name');
  if (!event) throw new ApiError(404, 'Event not found');
  return event;
};

const getAvailableSeats = async (eventId, capacity) => {
  const takenSeats = await Registration.countDocuments({
    eventId,
    status: 'confirmed',
  });
  return Math.max(capacity - takenSeats, 0);
};

module.exports = { buildEventFilter, getEventOrThrow, getAvailableSeats };
