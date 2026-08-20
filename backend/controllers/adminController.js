const asyncHandler = require('../utils/asyncHandler');
const Event = require('../models/Event');
const User = require('../models/User');
const Registration = require('../models/Registration');
const Volunteer = require('../models/Volunteer');

// @desc    Aggregate stats for the Admin Dashboard
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalEvents,
    upcomingEvents,
    totalUsers,
    totalRegistrations,
    totalVolunteers,
    recentRegistrations,
    eventsByStatus,
  ] = await Promise.all([
    Event.countDocuments(),
    Event.countDocuments({ status: { $in: ['upcoming', 'published'] }, date: { $gte: new Date() } }),
    User.countDocuments(),
    Registration.countDocuments({ status: 'confirmed' }),
    Volunteer.countDocuments(),
    Registration.find()
      .populate('userId', 'name email')
      .populate('eventId', 'title')
      .sort({ createdAt: -1 })
      .limit(5),
    Event.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
  ]);

  res.json({
    success: true,
    data: {
      totalEvents,
      upcomingEvents,
      totalUsers,
      totalRegistrations,
      totalVolunteers,
      recentRegistrations,
      eventsByStatus,
    },
  });
});

module.exports = { getDashboardStats };
