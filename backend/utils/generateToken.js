const jwt = require('jsonwebtoken');

/**
 * Generate a signed JWT for an authenticated account.
 * @param {string} id - Mongo document id of the user/admin
 * @param {'user'|'admin'} role - Account role, used for authorization checks
 */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = generateToken;
