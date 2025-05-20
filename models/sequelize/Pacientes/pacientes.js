// models/Pacientes/paciente.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class Paciente extends Model {}

Paciente.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    identidad_medica_id: { type: DataTypes.INTEGER, allowNull: false },
    obra_social_id: { type: DataTypes.INTEGER, allowNull: true },
    contacto_emergencia: DataTypes.STRING,
    fecha_registro: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Paciente",
    tableName: "pacientes",
    underscored: true,
    timestamps: true,
  }
);

// **Aquí** definimos la asociación, **pero solo si IdentidadMedica ya está registrado**.
if (sequelize.models.IdentidadMedica) {
  Paciente.belongsTo(sequelize.models.IdentidadMedica, {
    foreignKey: "identidad_medica_id",
    as: "identidad_medica",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
}

module.exports = Paciente;
