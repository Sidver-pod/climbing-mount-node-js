const Sequelize = require('sequelize');

//database, username, password
const sequelize = new Sequelize('node-complete', 'root', 'node_Complete*', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
