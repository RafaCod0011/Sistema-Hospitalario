const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const ObraSocial = sequelize.define(
  "ObraSocial",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: "obras_sociales",
    timestamps: false,
  }
);

module.exports = ObraSocial;
