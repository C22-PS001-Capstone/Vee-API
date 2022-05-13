/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const Hapi = require('@hapi/hapi');
require('dotenv').config();

// activities
const activities = require('./api/activities');
const ActivitiesService = require('./services/postgres/ActivitiesService');
const ActivitiesValidator = require('./validator/activities');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {
  const activitiesService = new ActivitiesService();
  const usersService = new UsersService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: activities,
      options: {
        service: activitiesService,
        validator: ActivitiesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
