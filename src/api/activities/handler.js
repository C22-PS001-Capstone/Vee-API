/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const fetch = require('node-fetch');
const ClientError = require('../../exceptions/ClientError');

class ActsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postActHandler = this.postActHandler.bind(this);
    this.getActsHandler = this.getActsHandler.bind(this);
    this.getActByIdHandler = this.getActByIdHandler.bind(this);
    this.putActByIdHandler = this.putActByIdHandler.bind(this);
    this.deleteActByIdHandler = this.deleteActByIdHandler.bind(this);
    this.postForecastHandler = this.postForecastHandler.bind(this);
    this.getActsByTimeHandler = this.getActsByTimeHandler.bind(this);
  }

  async postActHandler(request, h) {
    try {
      this._validator.validateActPayload(request.payload);
      const {
        date, lat = 0, lon = 0, km, price, liter,
      } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      const actId = await this._service.addAct({
        date, lat, lon, km, price, liter, owner: credentialId,
      });

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          actId,
        },
      });
      response.code(201);
      response.message('Catatan berhasil ditambahkan');
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

  async getActsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { size, page } = request.query;
    const acts = await this._service.getActs({ owner: credentialId, size, page });
    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan activities',
      data: {
        activities: acts,
      },
    });
    response.code(200);
    response.message('Berhasil mendapatkan activities');
    return response;
  }

  async getActsByTimeHandler(request, h) {
    const { timeopt } = request.params;
    let { time } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const date = new Date();
    if (time === 'now') {
      if (timeopt === 'year') {
        time = date.getYear() + 1900;
      } else if (timeopt === 'month') {
        time = date.getMonth() + 1;
      }
    }
    const acts = await this._service.getActsByTime({ owner: credentialId, timeopt, time });
    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan activities',
      data: {
        activities: acts,
      },
    });
    response.code(200);
    response.message('Berhasil mendapatkan activities');
    return response;
  }

  async getActByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyActOwner(id, credentialId);
      const act = await this._service.getActById(id);

      const response = h.response({
        status: 'success',
        message: 'Berhasil mendapatkan detail activities',
        data: {
          act,
        },
      });
      response.code(200);
      response.message('Berhasil mendapatkan detail activities');
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

  async putActByIdHandler(request, h) {
    try {
      this._validator.validateActPayload(request.payload);
      const {
        date, lat = 0, lon = 0, km, price, liter,
      } = request.payload;
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;
      await this._service.verifyActOwner(id, credentialId);

      await this._service.editActById(id, {
        date, lat, lon, km, price, liter,
      });

      const response = h.response({
        status: 'success',
        message: 'Activities berhasil diperbarui',
        data: [],
      });
      response.code(200);
      response.message('Activities berhasil diperbarui');
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

  async deleteActByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;
      await this._service.verifyActOwner(id, credentialId);
      await this._service.deleteActById(id);

      const response = h.response({
        status: 'success',
        message: 'Activities berhasil dihapus',
        data: [],
      });
      response.code(200);
      response.message('Activities berhasil dihapus');
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
        daata: [],
      });
      response.code(500);
      response.message('Maaf, terjadi kegagalan pada server kami.');
      console.error(error);
      return response;
    }
  }

  async postForecastHandler(request, h) {
    try {
      const { id } = request.auth.credentials;

      const result = await this._service.getActsPrice(id);
      const data = [];
      result.forEach((x) => {
        data.push(x.price);
      });
      const fetchResponse = await fetch('http://34.101.239.51/v2/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      const jsonResponse = await fetchResponse.json();

      const response = h.response({
        status: 'success',
        message: 'Forecast berhasil didapatkan',
        data: jsonResponse,
      });
      response.code(200);
      response.message('Forecast berhasil didapatkan');
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

module.exports = ActsHandler;
