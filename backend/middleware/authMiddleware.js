const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Verifies the JWT and attaches req.account + req.role.
// Works for both user and admin tokens since role is embedded in the token.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const Model = decoded.role === 'admin' ? Admin : User;
  const account = await Model.findById(decoded.id).select('-password');

  if (!account) {
    throw new ApiError(401, 'Not authorized, account no longer exists');
  }

  if (account.status === 'blocked') {
    throw new ApiError(403, 'Account is blocked. Contact the administrator.');
  }

  req.account = account;
  req.role = decoded.role;
  next();
});

// Restricts a route to Admin accounts only. Must run after `protect`.
const adminOnly = (req, res, next) => {
  if (req.role !== 'admin') {
    return next(new ApiError(403, 'Admin access required'));
  }
  next();
};

// Restricts a route to normal User accounts only. Must run after `protect`.
const userOnly = (req, res, next) => {
  if (req.role !== 'user') {
    return next(new ApiError(403, 'User access required'));
  }
  next();
};

module.exports = { protect, adminOnly, userOnly };
