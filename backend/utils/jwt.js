// backend/utils/jwt.js
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.JWT_SECRET;

// const generateAccessToken = (user) => {
//   return jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
// };

// module.exports = { generateAccessToken };

// backend/utils/jwt.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// Generate Access Token
exports.generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id, // Include the primary key (optional)
      user_id: user.user_id, // Include the user_id
    },
    SECRET_KEY,
    { expiresIn: '1h' } // Token expiry
  );
};

