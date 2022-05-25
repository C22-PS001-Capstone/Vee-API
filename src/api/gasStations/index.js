/* eslint-disable linebreak-style */
const GasStationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'gasStations',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const gasStationsHandler = new GasStationsHandler(service, validator);
    server.route(routes(gasStationsHandler));
  },
};
