const mysql = require("mysql");

const pool = mysql.createConnection({
    host:'localhost',
    user:'root', // mysql
    password:'root',
    database:'tst'
});

module.exports = pool;


