const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const Volunteer = require('../models/Volunteer');
const { buildEventFilter, getAvailableSeats } = require('../services/eventService');

// @desc    List events (supports search, category, and status filters)
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const { category, status, search, page = 1, limit = 12 } = req.query;
  const filter = buildEventFilter({ category, status, search });

  const skip = (Number(page) - 1) * Number(limit);
  const [events, total] = await Promise.all([
    Event.find(filter)
      .populate('category', 'name')
      .sort({ date: 1 })
      .skip(skip)
      .limit(Number(limit)),
    Event.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: events,
    pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
  });
});

// @desc    Get single event details, including available seats
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate('category', 'name');
  if (!event) throw new ApiError(404, 'Event not found');

  const availableSeats = await getAvailableSeats(event._id, event.capacity);

  res.json({ success: true, data: { ...event.toObject(), availableSeats } });
});

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create({ ...req.body, createdBy: req.account._id });
  res.status(201).json({ success: true, data: event });
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) throw new ApiError(404, 'Event not found');
  res.json({ success: true, data: event });
});

// @desc    Delete an event (also cleans up its registrations and volunteers)
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new ApiError(404, 'Event not found');

  await Promise.all([
    event.deleteOne(),
    Registration.deleteMany({ eventId: event._id }),
    Volunteer.deleteMany({ eventId: event._id }),
  ]);

  res.json({ success: true, message: 'Event and related data removed' });
});

// @desc    Get full detail view for Admin: event + registrations + volunteers
// @route   GET /api/events/:id/full
// @access  Private/Admin
const getEventFullDetail = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate('category', 'name');
  if (!event) throw new ApiError(404, 'Event not found');

  const [registrations, volunteers] = await Promise.all([
    Registration.find({ eventId: event._id }).populate('userId', 'name email phone'),
    Volunteer.find({ eventId: event._id }),
  ]);

  res.json({ success: true, data: { event, registrations, volunteers } });
});

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventFullDetail,
};
