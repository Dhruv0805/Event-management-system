const express = require('express');
const {
  getProfile,
  updateProfile,
  getUsers,
  getUserById,
  updateUserStatus,
} = require('../controllers/userController');
const { protect, adminOnly, userOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', protect, userOnly, getProfile);
router.put('/profile', protect, userOnly, updateProfile);

router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, adminOnly, getUserById);
router.put('/:id/status', protect, adminOnly, updateUserStatus);

module.exports = router;
