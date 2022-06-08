/* eslint-disable linebreak-style */
/* eslint-disable camelcase */

// table users

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    firstname: {
      type: 'TEXT',
      notNull: true,
    },
    lastname: {
      type: 'TEXT',
    },
    email: {
      type: 'TEXT',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'TEXT',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
