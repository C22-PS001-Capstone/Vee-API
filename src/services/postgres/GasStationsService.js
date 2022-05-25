/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

const { Pool } = require('pg');

class GasStationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addGasStation({
    id, name, lat, lon, vendor,
  }) {
    const query = {
      text: 'INSERT INTO gasstations VALUES($1, $2, $3, $4, $5)',
      values: [id, name, lat, lon, vendor],
    };

    await this._pool.query(query);
  }

  async getGasStations({ lat, lon }) {
    const query = {
      text: 'SELECT * FROM gasstations WHERE (point(lon,lat) <@> point($1, $2)) < 6',
      values: [lon, lat],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = GasStationsService;
