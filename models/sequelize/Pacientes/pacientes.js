const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index");

class Paciente extends Model {}
Paciente.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    identidad_medica_id: DataTypes.INTEGER,
    obra_social_id: DataTypes.INTEGER,
    contacto_emergencia: DataTypes.STRING,
    fecha_registro: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "paciente",
    tableName: "pacientes",
    underscored: true,
  }
);

module.exports = Paciente;
