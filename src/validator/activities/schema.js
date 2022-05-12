/* eslint-disable linebreak-style */
const Joi = require('joi');

const ActPayloadSchema = Joi.object({
  date: Joi.date().timestamp(),
  lat: Joi.number().required(),
  lon: Joi.number().required(),
  km: Joi.number().integer().required(),
  price: Joi.number().integer().required(),
  liter: Joi.number().required(),
});

module.exports = { ActPayloadSchema };
