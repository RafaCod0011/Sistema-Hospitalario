const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Personas = sequelize.define(
  "Persona",
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
    createdAt: false,
    updatedAt: false,
  }
);

Personas.associate = (models) => {
  console.log(
    "Ejecutando asociación para Persona con modelos:",
    Object.keys(models)
  );
  Personas.hasOne(models.IdentidadMedica, {
    foreignKey: "persona_id",
    as: "identidad_medica",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Personas.hasOne(models.Profesional, {
    foreignKey: "persona_id",
    as: "profesional",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Personas.hasOne(models.Recepcionista, {
    foreignKey: "persona_id",
    as: "recepcionista",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = Personas;
