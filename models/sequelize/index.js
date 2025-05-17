const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sis_hospital", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
