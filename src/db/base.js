const postgres = require('postgres');

const sql = postgres({ 
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'mydb'
});

module.exports = sql;