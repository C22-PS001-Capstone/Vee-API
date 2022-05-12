/* eslint-disable linebreak-style */
/* eslint-disable camelcase */

// table users

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    uid: {
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
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
