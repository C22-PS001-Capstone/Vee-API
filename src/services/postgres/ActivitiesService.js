/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class ActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addAct({
    date, lat, lon, km, price, liter, owner,
  }) {
    const id = `act-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO activities VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, date, lat, lon, km, price, liter, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Activities gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getActs({ owner, size, page }) {
    const query = {
      text: `SELECT * FROM activities WHERE owner = $1 
      ORDER BY date DESC
      LIMIT $2 OFFSET ($3 - 1) * $2`,
      values: [owner, size, page],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getActsByTime({ owner, timeopt, time }) {
    const query = {
      text: 'SELECT * from activities where date_part($1, date::date) = $2 and owner = $3 ORDER BY date DESC',
      values: [timeopt, time, owner],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getActById(id) {
    const query = {
      text: 'SELECT * FROM activities WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Activities tidak ditemukan');
    }

    return result.rows[0];
  }

  async editActById(id, {
    date, lat, lon, km, price, liter,
  }) {
    const query = {
      text: 'UPDATE activities SET date = $1, lat = $2, lon = $3, km = $4, price = $5, liter = $6 WHERE id = $7 RETURNING id',
      values: [date, lat, lon, km, price, liter, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui activities. Id tidak ditemukan');
    }
  }

  async deleteActById(id) {
    const query = {
      text: 'DELETE FROM activities WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Activities gagal dihapus. Id tidak ditemukan');
    }
  }

  async verifyActOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM activities WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Activities tidak ditemukan');
    }
    const act = result.rows[0];
    if (act.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async getActsPrice(owner) {
    const query = {
      text: 'SELECT price FROM activities WHERE owner = $1',
      values: [owner],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = ActivitiesService;
