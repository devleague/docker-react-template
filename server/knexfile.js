// Update with your config settings.
require('dotenv').config({path: '../.env'})

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOSTNAME,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_CONTAINER_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './server/database/migrations'
  },
  seeds: {
    directory: './server/database/seeds'
  }
};
