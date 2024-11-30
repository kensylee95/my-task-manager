// backend/routes/auth.js
const express = require('express');
const { register, login, refreshToken } = require('../controllers/authController'); // Include refreshToken
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken); // Add refresh token endpoint

module.exports = router;