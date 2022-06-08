/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

const { Pool } = require('pg');

class GasStationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addGasStation({
    id, name, lat, lon, vendor, operate, time_create,
  }) {
    const query = {
      text: 'INSERT INTO gasstations VALUES($1, $2, $3, $4, $5, $6, $7)',
      values: [id, name, lat, lon, vendor, operate, time_create],
    };

    await this._pool.query(query);
  }

  async getGasStations({ lat, lon }) {
    const query = {
      text: 'SELECT *, (point(lon,lat) <@> point($1, $2)) as distance FROM gasstations WHERE (point(lon,lat) <@> point($3, $4)) < 6',
      values: [lon, lat, lon, lat],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async editGasStation({ id, operate, time_create }) {
    const query = {
      text: 'UPDATE gasstations SET operate = $1, time_create = $2 WHERE id = $3',
      values: [operate, time_create, id],
    };

    await this._pool.query(query);
  }
}

module.exports = GasStationsService;
