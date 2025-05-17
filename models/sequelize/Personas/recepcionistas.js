const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index");

class Recepcionista extends Model {}
Recepcionista.init(
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
