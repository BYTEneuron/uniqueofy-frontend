const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Login user (Simulate OTP)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const { phone } = req.body;
    // Simulate OTP logic here
    res.json({ message: 'OTP sent successfully (simulation)', success: true });
};

// @desc    Complete profile and get token
// @route   POST /api/auth/complete-profile
// @access  Public
const completeProfile = async (req, res) => {
    const { phone, firstName, lastName } = req.body;

    let user = await User.findOne({ phone });

    if (!user) {
        user = await User.create({
            phone,
            firstName,
            lastName
        });
    } else {
        // Update existing user info if needed
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        await user.save();
    }

    res.json({
        _id: user._id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        token: generateToken(user._id)
    });
};

// @desc    Get current user
// @route   POST /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.json(req.user);
};

module.exports = { login, completeProfile, getMe };