const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const Notification = require('../models/Notification');

// @desc    Get the current user's notifications
// @route   GET /api/notifications
// @access  Private/User
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.account._id }).sort({
    createdAt: -1,
  });
  res.json({ success: true, data: notifications });
});

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private/User
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.account._id },
    { isRead: true },
    { new: true }
  );
  if (!notification) throw new ApiError(404, 'Notification not found');
  res.json({ success: true, data: notification });
});

module.exports = { getNotifications, markAsRead };
