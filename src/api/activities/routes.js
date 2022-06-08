/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */

const routes = (handler) => [
  {
    method: 'POST',
    path: '/activities',
    handler: handler.postActHandler,
    options: {
      auth: 'veeapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/activities',
    handler: handler.getActsHandler,
    options: {
      auth: 'veeapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/activities/{id}',
    handler: handler.getActByIdHandler,
    options: {
      auth: 'veeapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/activities/{id}',
    handler: handler.putActByIdHandler,
    options: {
      auth: 'veeapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/activities/{id}',
    handler: handler.deleteActByIdHandler,
    options: {
      auth: 'veeapp_jwt',
    },
  },
  {
    method: 'POST',
    path: '/forecast',
    handler: handler.postForecastHandler,
    options: {
      auth: 'veeapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/activities/{timeopt}/{time}',
    handler: handler.getActsByTimeHandler,
    options: {
      auth: 'veeapp_jwt',
    },
  },
];

module.exports = routes;
