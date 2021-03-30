const jwt = require('jsonwebtoken');

// Generate a JWT with user ID as payload
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = generateJWT;
