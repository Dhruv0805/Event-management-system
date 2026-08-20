const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const Volunteer = require('../models/Volunteer');
const { ensureEventExists } = require('../services/volunteerService');

// @desc    Add a volunteer to an event
// @route   POST /api/volunteers
// @access  Private/Admin
const createVolunteer = asyncHandler(async (req, res) => {
  await ensureEventExists(req.body.eventId);
  const volunteer = await Volunteer.create(req.body);
  res.status(201).json({ success: true, data: volunteer });
});

// @desc    List volunteers, optionally filtered by event
// @route   GET /api/volunteers?eventId=...
// @access  Private/Admin
const getVolunteers = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.eventId) filter.eventId = req.query.eventId;

  const volunteers = await Volunteer.find(filter)
    .populate('eventId', 'title date')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: volunteers });
});

// @desc    Update a volunteer's info, task, or status
// @route   PUT /api/volunteers/:id
// @access  Private/Admin
const updateVolunteer = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!volunteer) throw new ApiError(404, 'Volunteer not found');
  res.json({ success: true, data: volunteer });
});

// @desc    Remove a volunteer from an event
// @route   DELETE /api/volunteers/:id
// @access  Private/Admin
const deleteVolunteer = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
  if (!volunteer) throw new ApiError(404, 'Volunteer not found');
  res.json({ success: true, message: 'Volunteer removed' });
});

module.exports = { createVolunteer, getVolunteers, updateVolunteer, deleteVolunteer };
