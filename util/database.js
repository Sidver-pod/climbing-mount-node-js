const Sequelize = require('sequelize');

//database, username, password
const sequelize = new Sequelize('node-complete', 'root', 'frozenAirM1*', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
