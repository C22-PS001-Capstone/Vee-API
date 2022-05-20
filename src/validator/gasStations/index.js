/* eslint-disable linebreak-style */

const { GetGasStationQuerySchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const GasStationsValidator = {
  validateGasStationQuery: (query) => {
    const validationResult = GetGasStationQuerySchema.validate(query);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = GasStationsValidator;
