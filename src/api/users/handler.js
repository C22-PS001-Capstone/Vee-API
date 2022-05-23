/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */

const ClientError = require('../../exceptions/ClientError');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    this.putFirstLastNameByIdHandler = this.putFirstLastNameByIdHandler.bind(this);
    this.putPasswordByIdHandler = this.putPasswordByIdHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
      this._validator.validateUserPayload(request.payload);
      const {
        firstname, lastname, email, password,
      } = request.payload;

      const userId = await this._service.addUser({
        firstname, lastname, email, password,
      });

      const response = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });
      response.code(201);
      response.message('User berhasil ditambahkan');
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

  async getUserByIdHandler(request, h) {
    try {
      const { id } = request.auth.credentials;

      const user = await this._service.getUserById(id);

      const response = h.response({
        status: 'success',
        message: 'Berhasil mendapatkan detail user',
        data: {
          user,
        },
      });
      response.code(200);
      response.message('Berhasil mendapatkan detail user');
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

      // server ERROR!
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

  async putFirstLastNameByIdHandler(request, h) {
    try {
      this._validator.validatePutFirstLastNameByIdPayload(request.payload);
      const { firstname, lastname } = request.payload;
      const { id } = request.auth.credentials;

      await this._service.editFirstLastNameById(id, { firstname, lastname });

      const response = h.response({
        status: 'success',
        message: 'Firstname Lastname berhasil diperbarui',
        data: [],
      });
      response.code(200);
      response.message('Firstname Lastname berhasil diperbarui');
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

  async putPasswordByIdHandler(request, h) {
    try {
      this._validator.validatePutPasswordByIdPayload(request.payload);
      const { passwordCurrent, password } = request.payload;
      const { id } = request.auth.credentials;

      await this._service.verifyCurrentPassword(id, passwordCurrent);

      await this._service.editPasswordById(id, password);

      const response = h.response({
        status: 'success',
        message: 'Password berhasil diperbarui',
        data: [],
      });
      response.code(200);
      response.message('Password berhasil diperbarui');
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

module.exports = UsersHandler;
