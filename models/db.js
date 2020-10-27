'use strict';

var config = require('../config');
var Sequelize = require('sequelize');

var connect = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    timezone: '+08:00'
  }
);

module.exports = connect;
