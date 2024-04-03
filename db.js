const { Pool } = require('pg')
const pool = new Pool({
    host: 'keploy_postgres',
    port: 5432,
    user: 'postgres',
    password: 'pass123',
    database: 'postgres'
})

module.exports = pool