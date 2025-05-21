const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Paciente = sequelize.define(
  "Paciente",
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

Paciente.associate = (models) => {
  Paciente.belongsTo(models.ObraSocial, {
    foreignKey: "obra_social_id",
    as: "obra_social",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Paciente.belongsTo(models.IdentidadMedica, {
    foreignKey: "identidad_medica_id",
    as: "identidad_medica",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = Paciente;
