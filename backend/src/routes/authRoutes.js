const express = require('express');
const router = express.Router();
const { login, completeProfile, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/complete-profile', completeProfile);
router.post('/me', protect, getMe);

module.exports = router;