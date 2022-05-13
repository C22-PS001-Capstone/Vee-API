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
        date, lat, lon, km, price, liter,
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
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getActsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { size, page } = request.query;
    const acts = await this._service.getActs({ owner: credentialId, size, page });
    return {
      status: 'success',
      data: {
        activities: acts,
      },
    };
  }

  async getActByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyActOwner(id, credentialId);
      const act = await this._service.getActById(id);
      return {
        status: 'success',
        data: {
          act,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async putActByIdHandler(request, h) {
    try {
      this._validator.validateActPayload(request.payload);
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;
      await this._service.verifyActOwner(id, credentialId);

      await this._service.editActById(id, request.payload);

      return {
        status: 'success',
        message: 'Activities berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
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
      return {
        status: 'success',
        message: 'Activities berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = ActsHandler;
