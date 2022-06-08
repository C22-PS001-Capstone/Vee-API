/* eslint-disable linebreak-style */
const ActsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'activities',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const actsHandler = new ActsHandler(service, validator);
    server.route(routes(actsHandler));
  },
};
