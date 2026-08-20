const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const Registration = require('../models/Registration');
const Notification = require('../models/Notification');
const { validateRegistration } = require('../services/registrationService');

// @desc    Register the current user for an event
// @route   POST /api/registrations
// @access  Private/User
const createRegistration = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const event = await validateRegistration(req.account._id, eventId);

  const registration = await Registration.create({
    userId: req.account._id,
    eventId,
  });

  await Notification.create({
    userId: req.account._id,
    title: 'Registration confirmed',
    message: `You are registered for "${event.title}".`,
    type: 'success',
  });

  res.status(201).json({ success: true, data: registration });
});

// @desc    List registrations (User: own only, Admin: all or filtered by event)
// @route   GET /api/registrations
// @access  Private
const getRegistrations = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.role === 'user') {
    filter.userId = req.account._id;
  } else if (req.query.eventId) {
    filter.eventId = req.query.eventId;
  }
  if (req.query.status) filter.status = req.query.status;

  const registrations = await Registration.find(filter)
    .populate('eventId', 'title date venue image status')
    .populate('userId', 'name email phone')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: registrations });
});

// @desc    Cancel a registration (owner user, or Admin)
// @route   DELETE /api/registrations/:id
// @access  Private
const cancelRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);
  if (!registration) throw new ApiError(404, 'Registration not found');

  if (req.role === 'user' && String(registration.userId) !== String(req.account._id)) {
    throw new ApiError(403, 'You can only cancel your own registration');
  }

  registration.status = 'cancelled';
  await registration.save();

  res.json({ success: true, message: 'Registration cancelled', data: registration });
});

module.exports = { createRegistration, getRegistrations, cancelRegistration };
