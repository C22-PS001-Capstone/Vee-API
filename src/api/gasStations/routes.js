/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */

const routes = (handler) => [
  {
    method: 'GET',
    path: '/gasstations',
    handler: handler.getGasStationsHandler,
    options: {
      auth: 'veeapp_jwt',
    },
  },
];

module.exports = routes;
