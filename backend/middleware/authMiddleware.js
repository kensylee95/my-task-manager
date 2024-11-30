// // backend/middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const JWT_SECRET = process.env.JWT_SECRET;  // Use JWT_SECRET from your .env file
// const verifyToken = async (req, res, next) => {
//   if (!JWT_SECRET) {
//     console.error('JWT_SECRET is not defined');
//     return res.status(500).json({ success: false, message: 'Internal Server Error: Missing JWT_SECRET' });
//   }
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
//   }
//   const token = authHeader.split(' ')[1];
//   try {
//     // Verify token and extract payload
//     const decoded = jwt.verify(token, JWT_SECRET);
//     // Ensure user exists
//     const user = await User.findByPk(decoded.id);
//     if (!user) {
//       return res.status(401).json({ success: false, message: 'User not found. Invalid token.' });
//     }
//     // Attach user information to request
//     req.user = {
//       id: user.id,
//       user_id: user.user_id,
//       email: user.email,
//       full_name: user.full_name,
//     };
//     next();
//   } catch (error) {
//     console.error('Token verification error:', error);
//     res.status(403).json({ success: false, message: 'Invalid token.' });
//   }
// };
// module.exports = verifyToken;

// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET; // Use JWT_SECRET from your .env file

const verifyToken = async (req, res, next) => {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    return res.status(500).json({ success: false, message: 'Internal Server Error: Missing JWT_SECRET' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token and extract payload
    const decoded = jwt.verify(token, JWT_SECRET);

    // Ensure user exists
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found. Invalid token.' });
    }

    // Attach user information to request
    req.user = {
      id: user.id,
      user_id: user.user_id,
      email: user.email,
      full_name: user.full_name,
    };

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(403).json({ success: false, message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
