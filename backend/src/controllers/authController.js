const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const { ADMIN_DEFAULTS, OTP } = require('../config/constants');

// @desc    Verify OTP and login/signup
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    if (otp !== OTP.DEFAULT) {
      return errorResponse(res, 'Invalid OTP', 'INVALID_OTP', 400);
    }

    let user = await User.findOne({ phone });

    // Admin Logic
    if (phone === ADMIN_DEFAULTS.PHONE) {
      if (!user) {
        user = await User.create({
          phone,
          firstName: ADMIN_DEFAULTS.FIRST_NAME,
          lastName: ADMIN_DEFAULTS.LAST_NAME,
          role: 'admin',
        });
      } else if (user.role !== 'admin') {
        // Enforce admin role if phone matches
        user.role = 'admin';
        await user.save();
      }
    } else {
      // User Logic
      if (!user) {
        user = await User.create({
          phone,
        });
      }
    }

    if (!user.isActive) {
      return errorResponse(res, 'User is inactive', 'USER_INACTIVE', 403);
    }

    const token = generateToken(user._id);

    successResponse(res, {
      token,
      user: {
        id: user._id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    }, 'OTP verified successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    successResponse(res, user, 'User profile retrieved');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyOtp,
  getMe,
};