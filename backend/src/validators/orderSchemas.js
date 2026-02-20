const Joi = require('joi');

const createOrderSchema = Joi.object({
  services: Joi.array()
    .items(
      Joi.object({
        serviceId: Joi.string().required(),
        name: Joi.string().required(),
        quantity: Joi.number().min(1).default(1),
      })
    )
    .min(1)
    .required(),

  serviceDate: Joi.date().required(),

  timeSlot: Joi.string().required(),

  address: Joi.string().required(),

  note: Joi.string().allow('').optional(),
});

module.exports = {
  createOrderSchema,
};