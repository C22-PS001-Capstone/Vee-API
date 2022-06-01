/* eslint-disable linebreak-style */
const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  passwordConfirm: Joi.ref('password'),
});

const PutFirstLastNameByIdSchemaPayload = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
});

const PutPasswordByIdSchemaPayload = Joi.object({
  passwordCurrent: Joi.string().required(),
  password: Joi.string().required(),
  passwordConfirm: Joi.ref('password'),
});

const PutPasswordGoogleByIdSchemaPayload = Joi.object({
  password: Joi.string().required(),
  passwordConfirm: Joi.ref('password'),
});

module.exports = {
  UserPayloadSchema,
  PutFirstLastNameByIdSchemaPayload,
  PutPasswordByIdSchemaPayload,
  PutPasswordGoogleByIdSchemaPayload,
};
