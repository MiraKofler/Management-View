const { Pool } = require('pg');

let pool = new Pool(
    {
        user: "postgres",
        host: "localhost",
        database: "GuestViewFreebi",
        password:"admin",
        port:"5432"
});

module.exports = pool;