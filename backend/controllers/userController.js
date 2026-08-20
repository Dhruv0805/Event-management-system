const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const User = require('../models/User');
const Registration = require('../models/Registration');

// @desc    Get current user's profile
// @route   GET /api/users/profile
// @access  Private/User
const getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.account });
});

// @desc    Update current user's profile
// @route   PUT /api/users/profile
// @access  Private/User
const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.account._id,
    { name, phone },
    { new: true, runValidators: true }
  );
  res.json({ success: true, data: user });
});

// @desc    List all users (Admin -> User Management)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const { search, status } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const users = await User.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: users });
});

// @desc    Get a single user with their registered events
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');

  const registrations = await Registration.find({ userId: user._id }).populate(
    'eventId',
    'title date status'
  );

  res.json({ success: true, data: { user, registrations } });
});

// @desc    Update a user's account status (active/blocked)
// @route   PUT /api/users/:id/status
// @access  Private/Admin
const updateUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );
  if (!user) throw new ApiError(404, 'User not found');
  res.json({ success: true, data: user });
});

module.exports = { getProfile, updateProfile, getUsers, getUserById, updateUserStatus };
