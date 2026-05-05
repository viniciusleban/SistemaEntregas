const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('banco1', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
