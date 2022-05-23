/* eslint-disable linebreak-style */
const InvariantError = require('../../exceptions/InvariantError');
const { UserPayloadSchema, PutFirstLastNameByIdSchemaPayload } = require('./schema');

const UsersValidator = {
  validateUserPayload: (payload) => {
    const validationResult = UserPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutFirstLastNameByIdPayload: (payload) => {
    const validationResult = PutFirstLastNameByIdSchemaPayload.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;
