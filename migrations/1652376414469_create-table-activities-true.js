/* eslint-disable linebreak-style */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('activities', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    date: {
      type: 'timestamp',
      notNull: true,
    },
    lat: {
      type: 'float8',
      notNull: true,
    },
    lon: {
      type: 'float8',
      notNull: true,
    },
    km: {
      type: 'integer',
      notNull: true,
    },
    price: {
      type: 'integer',
      notNull: true,
    },
    liter: {
      type: 'float',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('activities', 'fk_activities.owner_users.uid', 'FOREIGN KEY(owner) REFERENCES users(uid) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('activities');
};
