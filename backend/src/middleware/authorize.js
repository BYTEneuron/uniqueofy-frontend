const { errorResponse } = require('../utils/responseFormatter');

const authorize = (...roles) => {
  return (req, res, next) => {
    // Safety check: ensure user exists
    if (!req.user) {
      return errorResponse(
        res,
        'Not authorized. No user context found.',
        'UNAUTHORIZED',
        401
      );
    }

    // Safety check: ensure role exists
    if (!req.user.role) {
      return errorResponse(
        res,
        'User role not found.',
        'FORBIDDEN',
        403
      );
    }

    // Role validation
    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        `User role '${req.user.role}' is not authorized to access this route`,
        'FORBIDDEN',
        403
      );
    }

    next();
  };
};

module.exports = authorize;
