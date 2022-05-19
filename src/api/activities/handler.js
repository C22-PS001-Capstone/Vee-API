/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
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
}

module.exports = ActsHandler;
