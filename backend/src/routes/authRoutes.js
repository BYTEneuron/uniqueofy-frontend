const express = require('express');
const { verifyOtp, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { verifyOtpSchema } = require('../validators/authSchemas');

const router = express.Router();

router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
router.get('/me', protect, getMe);

module.exports = router;