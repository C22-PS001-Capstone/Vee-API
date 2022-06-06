/* eslint-disable linebreak-style */
const { ActPayloadSchema, PostForecastPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ActsValidator = {
  validateActPayload: (payload) => {
    const validationResult = ActPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePostForecastPayload: (payload) => {
    const validationResult = PostForecastPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ActsValidator;
