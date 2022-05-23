/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const fetch = require('node-fetch');
const ClientError = require('../../exceptions/ClientError');

function distance(lat1, lon1, lat2, lon2) {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  }

  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist *= 1.609344;
  return dist;
}

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

      const gasstations = [];

      jsonResponse.features.forEach((gs) => {
        gasstations.push({
          place_name: gs.place_name,
          address: gs.properties.address,
          vendor: gs.text,
          distance: distance(lat, lon, gs.geometry.coordinates[1], gs.geometry.coordinates[0]),
          latitude: gs.geometry.coordinates[1],
          longitude: gs.geometry.coordinates[0],
        });
      });

      const response = h.response({
        status: 'success',
        message: 'Gas Stations terdekat berhasil didapatkan',
        data: gasstations,
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
