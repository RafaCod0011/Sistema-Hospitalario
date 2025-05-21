const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sis_hospital", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
