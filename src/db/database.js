const { Sequelize } = require("sequelize");
const { DB, USER, PASSWORD, HOST, DIALECT } = require("../../config/config");

const database = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  logging: false,
});

module.exports = database;
