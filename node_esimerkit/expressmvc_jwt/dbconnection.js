var mysql = require('mysql');

var connection = mysql.createPool({

    host: 'localhost',
    user: 'websk',
    password: 'websk',
    database: 'websk'

});
module.exports = connection;
