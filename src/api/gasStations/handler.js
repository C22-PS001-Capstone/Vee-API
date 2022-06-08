/* eslint-disable linebreak-style */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */

const fetch = require('node-fetch');
const ClientError = require('../../exceptions/ClientError');

async function distance(lat1, lon1, lat2, lon2) {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  }

  const fetchResponse = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&key=${process.env.MAPS_API_KEY}`);
  const jsonResponse = await fetchResponse.json();

  const jarak = jsonResponse.rows[0].elements[0].distance.value;

  return (jarak / 1000).toFixed(2);
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

        for (const gs of jsonResponse.results) {
          let vendor = '';
          let open;
          try {
            open = gs.opening_hours.open_now;
          } catch (e) {
            continue;
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
                distance: await distance(lat, lon, gs.geometry.location.lat, gs.geometry.location.lng),
                lat: gs.geometry.location.lat,
                lon: gs.geometry.location.lng,
                operate: gs.opening_hours.open_now,
              });

              await this._service.addGasStation({
                id: gs.place_id, name: gs.name, lat: gs.geometry.location.lat, lon: gs.geometry.location.lng, vendor, operate: gs.opening_hours.open_now, time_create: Date.now(),
              });
            }
          }
        }
      } else if ((gasstationsdb[0].time_create + 86400000) <= Date.now()) {
        const fetchResponse = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=10000&type=gas_station&key=${process.env.MAPS_API_KEY}`);
        const jsonResponse = await fetchResponse.json();

        for (const gs of jsonResponse.results) {
          let open;
          try {
            open = gs.opening_hours.open_now;
          } catch (e) {
            continue;
          }
          if (open !== undefined) {
            await this._service.editGasStation({
              id: gs.place_id, operate: open, time_create: Date.now(),
            });
          }
        }

        const gasstationsdbupdate = await this._service.getGasStations({ lat, lon });

        for (const gs of gasstationsdbupdate) {
          gasstations.push({
            id: gs.id,
            name: gs.name,
            vendor: gs.vendor,
            distance: await distance(lat, lon, gs.lat, gs.lon),
            lat: gs.lat,
            lon: gs.lon,
            operate: gs.operate,
          });
        }
      } else {
        for (const gs of gasstationsdb) {
          gasstations.push({
            id: gs.id,
            name: gs.name,
            vendor: gs.vendor,
            distance: await distance(lat, lon, gs.lat, gs.lon),
            lat: gs.lat,
            lon: gs.lon,
            operate: gs.operate,
          });
        }
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
