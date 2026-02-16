const Joi = require('joi');

const createServiceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  isActive: Joi.boolean().optional(),
});

const updateServiceSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  category: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});

module.exports = {
  createServiceSchema,
  updateServiceSchema,
};
