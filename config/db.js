const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");

const sequelize = new Sequelize("sis_hospital", "root", "", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: mysql2,
  logging: false,
});

module.exports = sequelize;
