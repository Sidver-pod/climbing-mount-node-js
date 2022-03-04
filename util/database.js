/* code to set up a connection with the SQL database which then gives back a connection object to run queries*/

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'pass_node_complete'
});

module.exports = pool.promise();
