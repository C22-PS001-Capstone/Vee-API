/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable camelcase */

const ClientError = require('../../exceptions/ClientError');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.postGoogleAuthenticationHandler = this.postGoogleAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    try {
      this._validator.validatePostAuthenticationPayload(request.payload);

      const { email, password } = request.payload;
      const id = await this._usersService.verifyUserCredential(email, password);

      const accessToken = this._tokenManager.generateAccessToken({ id });
      const refreshToken = this._tokenManager.generateRefreshToken({ id });

      await this._authenticationsService.addRefreshToken(refreshToken);

      const response = h.response({
        status: 'success',
        message: 'Authentication berhasil ditambahkan',
        data: {
          accessToken,
          refreshToken,
          maxTokenAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
      });
      response.code(201);
      response.message('Authentication berhasil ditambahkan');
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

  async postGoogleAuthenticationHandler(request, h) {
    try {
      const { authorization } = request.headers;
      const idToken = authorization.split(' ')[1];
      const {
        aud, email, given_name, family_name,
      } = this._tokenManager.getTokenPayload(idToken);

      await this._tokenManager.verifyGoogleToken({ aud, idToken });
      const result = await this._usersService.verifyUserGoogle(email);

      if (result.rows.length === 0) {
        const id = await this._usersService.addUserGoogle({
          firstname: given_name, lastname: family_name, email, password: null,
        });

        const accessToken = this._tokenManager.generateAccessToken({ id });
        const refreshToken = this._tokenManager.generateRefreshToken({ id });
        await this._authenticationsService.addRefreshToken(refreshToken);

        const response = h.response({
          status: 'success',
          message: 'Authentication berhasil ditambahkan',
          data: {
            accessToken,
            refreshToken,
            maxTokenAgeSec: process.env.ACCESS_TOKEN_AGE,
          },
        });
        response.code(201);
        response.message('Authentication berhasil ditambahkan');
        return response;
      }

      const accessToken = this._tokenManager.generateAccessToken({ id: result.id });
      const refreshToken = this._tokenManager.generateRefreshToken({ id: result.id });

      await this._authenticationsService.addRefreshToken(refreshToken);

      const response = h.response({
        status: 'success',
        message: 'Authentication berhasil ditambahkan',
        data: {
          accessToken,
          refreshToken,
          maxTokenAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
      });
      response.code(201);
      response.message('Authentication berhasil ditambahkan');
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

  async putAuthenticationHandler(request, h) {
    try {
      this._validator.validatePutAuthenticationPayload(request.payload);

      const { refreshToken } = request.payload;
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

      const accessToken = this._tokenManager.generateAccessToken({ id });

      const response = h.response({
        status: 'success',
        message: 'Access Token berhasil diperbarui',
        data: {
          accessToken,
          maxTokenAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
      });
      response.code(200);
      response.message('Access Token berhasil diperbarui');
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

  async deleteAuthenticationHandler(request, h) {
    try {
      this._validator.validateDeleteAuthenticationQuery(request.query);

      const { refreshToken } = request.query;
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      await this._authenticationsService.deleteRefreshToken(refreshToken);

      const response = h.response({
        status: 'success',
        message: 'Refresh token berhasil dihapus',
        data: [],
      });
      response.code(200);
      response.message('Refresh token berhasil dihapus');
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

module.exports = AuthenticationsHandler;
