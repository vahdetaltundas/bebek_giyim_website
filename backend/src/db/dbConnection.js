
const mysql = require("mysql2");
require("dotenv").config();

const dbConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'bebek_giyim_db',
    multipleStatements:false
});

module.exports = dbConnection.promise();
