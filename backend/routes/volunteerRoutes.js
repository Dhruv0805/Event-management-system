const express = require('express');
const { body } = require('express-validator');
const {
  createVolunteer,
  getVolunteers,
  updateVolunteer,
  deleteVolunteer,
} = require('../controllers/volunteerController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.use(protect, adminOnly);

router.post(
  '/',
  [
    body('eventId').notEmpty().withMessage('eventId is required'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('contact').trim().notEmpty().withMessage('Contact is required'),
    body('task').trim().notEmpty().withMessage('Task is required'),
  ],
  validate,
  createVolunteer
);
router.get('/', getVolunteers);
router.put('/:id', updateVolunteer);
router.delete('/:id', deleteVolunteer);

module.exports = router;
