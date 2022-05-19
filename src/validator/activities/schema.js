/* eslint-disable linebreak-style */
const Joi = require('joi');

const ActPayloadSchema = Joi.object({
  date: Joi.date().required(),
  lat: Joi.number(),
  lon: Joi.number(),
  km: Joi.number().integer().required(),
  price: Joi.number().integer().required(),
  liter: Joi.number().required(),
});

module.exports = { ActPayloadSchema };
