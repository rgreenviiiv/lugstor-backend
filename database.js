const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'lugstor_project'
  }
});

module.exports = knex;
