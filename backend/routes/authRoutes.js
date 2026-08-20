const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser, loginAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validate,
  registerUser
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validate,
  loginUser
);

router.post(
  '/admin/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validate,
  loginAdmin
);

router.get('/me', protect, getMe);

module.exports = router;
