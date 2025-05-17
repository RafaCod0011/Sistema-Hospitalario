const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index");
const Paciente = require("../Pacientes/pacientes");

class IdentidadMedica extends Model {}

IdentidadMedica.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    persona_id: DataTypes.INTEGER,
    es_temporal: { type: DataTypes.BOOLEAN, defaultValue: true },
    codigo_temp: DataTypes.STRING,
    fecha_creacion: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "identidad_medica",
    tableName: "identidades_medicas",
    underscored: true,
  }
);

IdentidadMedica.hasOne(Paciente, { foreignKey: "identidad_medica_id" });
Paciente.belongsTo(IdentidadMedica);

module.exports = IdentidadMedica;
