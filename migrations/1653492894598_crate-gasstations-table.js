/* eslint-disable linebreak-style */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('gasstations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      unique: true,
    },
    name: {
      type: 'text',
      notNull: true,
    },
    lat: {
      type: 'float8',
      notNull: false,
    },
    lon: {
      type: 'float8',
      notNull: false,
    },
    vendor: {
      type: 'text',
      notNull: true,
    },
    operate: {
      type: 'boolean',
      notNull: true,
    },
    time_create: {
      type: 'bigint',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('gasstations');
};
