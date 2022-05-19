/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const Joi = require('joi');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      description: 'Login an user',
      notes: 'Returns access token and refresh token by login',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required().description('email for login'),
          password: Joi.string().required().description('password for login'),
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
  },
];

module.exports = routes;
