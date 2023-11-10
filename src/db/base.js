const postgres = require('postgres');

// Настройки подключения к базе данных
const connect = {
    host: 'localhost', 
    port: 5432, 
    user: 'postgres', 
    database: 'mydb'
}

const sql = postgres(connect);

module.exports = sql;