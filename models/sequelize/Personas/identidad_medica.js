// models/Identidades/identidad_medica.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class IdentidadMedica extends Model {}

IdentidadMedica.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    persona_id: { type: DataTypes.INTEGER, allowNull: true },
    es_temporal: { type: DataTypes.BOOLEAN, defaultValue: true },
    codigo_temp: DataTypes.STRING,
    fecha_creacion: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "IdentidadMedica",
    tableName: "identidades_medicas",
    underscored: true,
    timestamps: true,
  }
);

// **Aquí** definimos la asociación, **pero solo si Paciente ya está registrado**.
if (sequelize.models.Paciente) {
  IdentidadMedica.hasOne(sequelize.models.Paciente, {
    foreignKey: "identidad_medica_id",
    as: "paciente",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
}

module.exports = IdentidadMedica;
