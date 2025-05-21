const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Recepcionista = sequelize.define(
  "Recepcionista",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: DataTypes.INTEGER,
    persona_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "recepcionista",
    tableName: "recepcionistas",
    underscored: true,
  }
);

module.exports = Recepcionista;
