const { Pool } = require('pg');

let pool = new Pool(
    {
        user: "postgres",
        host: "localhost",
        database: "webtech21project",
        password:"Jagoda97",
        port:"5432"
});

module.exports = pool;
