/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */

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
  return dist.toFixed(2);
}

class GasStationsHandler {
  constructor(service, validator) {
    this._validator = validator;
    this._service = service;
    this.getGasStationsHandler = this.getGasStationsHandler.bind(this);
  }

  async getGasStationsHandler(request, h) {
    try {
      this._validator.validateGasStationQuery(request.query);
      const { lat = 0.0, lon = 0.0 } = request.query;

      if (lat == 0.0 && lon == 0.0) {
        console.log('jalan nih');
        const response = h.response({
          status: 'success',
          message: 'Gas Stations terdekat berhasil didapatkan',
          data: [],
        });
        response.code(200);
        response.message('Gas Stations terdekat berhasil didapatkan');
        return response;
      }

      const gasstations = [];

      const gasstationsdb = await this._service.getGasStations({ lat, lon });

      if (gasstationsdb.length === 0) {
        const fetchResponse = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=10000&type=gas_station&key=${process.env.MAPS_API_KEY}`);
        const jsonResponse = await fetchResponse.json();

        jsonResponse.results.forEach(async (gs) => {
          let vendor = '';
          let open;
          try {
            open = gs.opening_hours.open_now;
          } catch (e) {
            return;
          }

          if (open !== undefined) {
            if (gs.name.match(/spbu/i) || gs.name.match(/pom/i)) {
              if (gs.name.match(/shell/i)) {
                vendor = 'Shell';
              } else if (gs.name.match(/bp/i)) {
                vendor = 'Bp';
              } else if (gs.name.match(/mini/i)) {
                vendor = 'Pertamini';
              } else {
                vendor = 'Pertamina';
              }

              gasstations.push({
                id: gs.place_id,
                name: gs.name,
                vendor,
                distance: distance(lat, lon, gs.geometry.location.lat, gs.geometry.location.lng),
                lat: gs.geometry.location.lat,
                lon: gs.geometry.location.lng,
                operate: gs.opening_hours.open_now,
              });

              await this._service.addGasStation({
                id: gs.place_id, name: gs.name, lat: gs.geometry.location.lat, lon: gs.geometry.location.lng, vendor, operate: gs.opening_hours.open_now, time_create: Date.now(),
              });
            }
          }
        });
      } else if ((gasstationsdb[0].time_create + 86400000) <= Date.now()) {
        const fetchResponse = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=10000&type=gas_station&key=${process.env.MAPS_API_KEY}`);
        const jsonResponse = await fetchResponse.json();

        jsonResponse.results.forEach(async (gs) => {
          let open;
          try {
            open = gs.opening_hours.open_now;
          } catch (e) {
            return;
          }
          if (open !== undefined) {
            await this._service.editGasStation({
              id: gs.place_id, operate: open, time_create: Date.now(),
            });
          }
        });

        const gasstationsdbupdate = await this._service.getGasStations({ lat, lon });

        gasstationsdbupdate.forEach((gs) => {
          gasstations.push({
            id: gs.id,
            name: gs.name,
            vendor: gs.vendor,
            distance: distance(lat, lon, gs.lat, gs.lon),
            lat: gs.lat,
            lon: gs.lon,
            operate: gs.operate,
          });
        });
      } else {
        gasstationsdb.forEach((gs) => {
          gasstations.push({
            id: gs.id,
            name: gs.name,
            vendor: gs.vendor,
            distance: distance(lat, lon, gs.lat, gs.lon),
            lat: gs.lat,
            lon: gs.lon,
            operate: gs.operate,
          });
        });
      }

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
