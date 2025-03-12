const mysql = require('mysql2/promise')
require('dotenv/config');

const mysqlPool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password : process.env.MYSQLPASSWD,
    database: process.env.MYSQLDB
})

module.exports = mysqlPool;