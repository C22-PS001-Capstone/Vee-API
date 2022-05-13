/* eslint-disable linebreak-style */
const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  passwordConfirm: Joi.ref('password'),
});

module.exports = { UserPayloadSchema };
