const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const IdentidadMedica = sequelize.define(
  "IdentidadMedica",
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

IdentidadMedica.associate = (models) => {
  IdentidadMedica.hasOne(models.Paciente, {
    foreignKey: "identidad_medica_id",
    as: "paciente",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = IdentidadMedica;
