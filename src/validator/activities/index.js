/* eslint-disable linebreak-style */
const { ActPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ActsValidator = {
  validateActPayload: (payload) => {
    const validationResult = ActPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ActsValidator;
