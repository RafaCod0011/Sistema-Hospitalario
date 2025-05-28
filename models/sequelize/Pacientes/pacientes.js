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
    obra_social_id: { type: DataTypes.INTEGER, allowNull: true },
    contacto_emergencia: DataTypes.STRING,
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

  Paciente.hasMany(models.IdentidadMedica, {
    foreignKey: "paciente_id",
    as: "identidades_medicas",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = Paciente;
