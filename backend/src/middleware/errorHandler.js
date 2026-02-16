const { errorResponse } = require('../utils/responseFormatter');
const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  if (err.name === 'ValidationError') {
    return errorResponse(res, err.message, 'VALIDATION_ERROR', 400);
  }

  if (err.name === 'UnauthorizedError') {
    return errorResponse(res, 'Invalid token', 'UNAUTHORIZED', 401);
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    error: err.code || 'SERVER_ERROR',
  });
};

module.exports = errorHandler;
