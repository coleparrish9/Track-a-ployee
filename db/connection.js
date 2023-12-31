const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'employee_db',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = db;