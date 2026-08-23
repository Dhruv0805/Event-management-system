const { body, validationResult } = require('express-validator');

// Validation rules for creating/updating events
const validateEventInput = [
  body('title')
    .trim()
    .notEmpty().withMessage('Event title is required')
    .isLength({ min: 5, max: 200 }).withMessage('Title must be 5-200 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  
  body('date')
    .isISO8601().withMessage('Invalid date format')
    .custom((value) => {
      const eventDate = new Date(value);
      if (eventDate < new Date()) {
        throw new Error('Event date must be in the future');
      }
      return true;
    }),
  
  body('registrationDeadline')
    .isISO8601().withMessage('Invalid deadline format')
    .custom((value, { req }) => {
      const deadline = new Date(value);
      const eventDate = new Date(req.body.date);
      if (deadline >= eventDate) {
        throw new Error('Registration deadline must be before event date');
      }
      if (deadline < new Date()) {
        throw new Error('Registration deadline must be in the future');
      }
      return true;
    }),
  
  body('capacity')
    .isInt({ min: 1, max: 10000 }).withMessage('Capacity must be between 1 and 10000'),
  
  body('location')
    .trim()
    .notEmpty().withMessage('Location is required')
    .isLength({ min: 3, max: 100 }).withMessage('Location must be 3-100 characters'),
  
  body('category')
    .notEmpty().withMessage('Category ID is required')
    .isMongoId().withMessage('Invalid category ID'),
];

const validateAuthInput = [
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain uppercase, lowercase, and numbers'),
  
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/).withMessage('Invalid phone number'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.param, message: e.msg })),
    });
  }
  next();
};

module.exports = {
  validateEventInput,
  validateAuthInput,
  handleValidationErrors,
};
