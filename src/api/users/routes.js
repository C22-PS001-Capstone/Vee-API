/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */

const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'veeapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/users',
    handler: handler.putFirstLastNameByIdHandler,
    options: {
      auth: 'veeapp_jwt',
    },
  },
];

module.exports = routes;
