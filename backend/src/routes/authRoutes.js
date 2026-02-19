const express = require('express');
const { sendOtp, verifyOtp, refresh, logout, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { verifyOtpSchema } = require('../validators/authSchemas');

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
