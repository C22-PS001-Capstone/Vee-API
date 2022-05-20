/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const fetch = require('node-fetch');
const ClientError = require('../../exceptions/ClientError');

class GasStationsHandler {
  constructor(validator) {
    this._validator = validator;
    this.getGasStationsHandler = this.getGasStationsHandler.bind(this);
  }

  async getGasStationsHandler(request, h) {
    try {
      this._validator.validateGasStationQuery(request.query);
      const { lat = 0, lon = 0 } = request.query;

      const fetchResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/fuel.json?type=poi&proximity=${lon},${lat}&access_token=${process.env.MAPBOX_API_KEY}`);
      const jsonResponse = await fetchResponse.json();

      const response = h.response({
        status: 'success',
        message: 'Gas Stations terdekat berhasil didapatkan',
        data: {
          nearestGasStations: jsonResponse.features,
        },
      });
      response.code(200);
      response.message('Gas Stations terdekat berhasil didapatkan');
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
          data: [],
        });
        response.code(error.statusCode);
        response.message(error.message);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
        data: [],
      });
      response.code(500);
      response.message('Maaf, terjadi kegagalan pada server kami.');
      console.error(error);
      return response;
    }
  }
}

module.exports = GasStationsHandler;
