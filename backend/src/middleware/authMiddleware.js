const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { errorResponse } = require('../utils/responseFormatter');



const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Not authorized, no token', 'UNAUTHORIZED', 401);

    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-refreshToken');

    if (!user) {
      return errorResponse(res, 'Not authorized, user not found', 'UNAUTHORIZED', 401);

    }

    req.user = user;
    next();

  } catch (error) {
    return errorResponse(res, 'Not authorized, token failed', 'UNAUTHORIZED', 401);

  }
};

module.exports = { protect };
