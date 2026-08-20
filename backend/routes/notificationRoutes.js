const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const { protect, userOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, userOnly);
router.get('/', getNotifications);
router.put('/:id/read', markAsRead);

module.exports = router;
