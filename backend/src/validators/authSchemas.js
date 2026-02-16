const Joi = require('joi');

const verifyOtpSchema = Joi.object({
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.length': 'Phone number must be exactly 10 digits',
      'string.pattern.base': 'Phone number must contain only digits',
    }),
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.length': 'OTP must be exactly 6 digits',
      'string.pattern.base': 'OTP must contain only digits',
    }),
});

module.exports = {
  verifyOtpSchema,
};
