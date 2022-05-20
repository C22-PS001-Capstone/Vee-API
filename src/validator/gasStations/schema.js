/* eslint-disable linebreak-style */

const Joi = require('joi');

const GetGasStationQuerySchema = Joi.object({
  lat: Joi.number(),
  lon: Joi.number(),
});

module.exports = { GetGasStationQuerySchema };
