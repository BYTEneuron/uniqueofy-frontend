const { errorResponse } = require('../utils/responseFormatter');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 'VALIDATION_ERROR', 400);
  }
  next();
};

module.exports = validate;
