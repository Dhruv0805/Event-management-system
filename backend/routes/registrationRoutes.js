const express = require('express');
const { body } = require('express-validator');
const {
  createRegistration,
  getRegistrations,
  cancelRegistration,
} = require('../controllers/registrationController');
const { protect, userOnly } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.post(
  '/',
  protect,
  userOnly,
  [body('eventId').notEmpty().withMessage('eventId is required')],
  validate,
  createRegistration
);
router.get('/', protect, getRegistrations);
router.delete('/:id', protect, cancelRegistration);

module.exports = router;
