/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const Joi = require('joi');

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
      description: 'Get activities by id',
      notes: 'Returns a activities item detail by the id passed in the path',
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description('the id for the activities item'),
        }),
      },
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
];

module.exports = routes;
