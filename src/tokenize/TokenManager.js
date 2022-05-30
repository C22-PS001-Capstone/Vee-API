/* eslint-disable linebreak-style */
const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
  getTokenPayload: (payload) => Jwt.token.decode(payload).decoded.payload,
  verifyGoogleToken: ({ aud, idToken }) => {
    try {
      const decoded = Jwt.token.decode(idToken);
      Jwt.token.verifyTime(decoded);
      if (aud !== '1005222607863-0i7ku80iigrd27ft278huc288beb29nl.apps.googleusercontent.com') {
        throw new InvariantError('Token tidak valid');
      }
    } catch (error) {
      throw new InvariantError('Token tidak valid');
    }
  },
};

module.exports = TokenManager;
