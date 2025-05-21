const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Personas = sequelize.define(
  "Personas",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: DataTypes.STRING,
    dni: { type: DataTypes.STRING, unique: "uniq_personas_dni" },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      field: "fecha_nacimiento",
      allowNull: false,
      get() {
        return this.getDataValue("fecha_nacimiento");
      },
      set(value) {
        this.setDataValue("fecha_nacimiento", value);
      },
    },
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING,
    es_temporal: { type: DataTypes.BOOLEAN, defaultValue: false },
    observaciones: DataTypes.TEXT,
    genero: DataTypes.STRING(1),
  },
  {
    sequelize,
    modelName: "personas",
    tableName: "personas",
  }
);

Personas.associate = (models) => {
  Personas.hasMany(models.IdentidadMedica, {
    foreignKey: "persona_id",
    as: "identidades_medicas",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Personas.hasMany(models.Profesionales, {
    foreignKey: "persona_id",
    as: "profesionales",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Personas.hasMany(models.Recepcionista, {
    foreignKey: "persona_id",
    as: "recepcionistas",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = Personas;
