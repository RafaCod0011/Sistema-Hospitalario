const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index");
const IdentidadMedica = require("./identidad_medica");
const Profesional = require("./profesionales");
const Recepcionista = require("./recepcionistas");

class Personas extends Model {}

Personas.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: DataTypes.STRING,
    dni: { type: DataTypes.STRING, unique: true },
    fecha_nacimiento: DataTypes.DATEONLY,
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

Personas.hasMany(IdentidadMedica, { foreignKey: "persona_id" });
IdentidadMedica.belongsTo(Personas, { foreignKey: "persona_id" });

Personas.hasOne(Profesional, { foreignKey: "persona_id" });
Profesional.belongsTo(Personas);

Personas.hasOne(Recepcionista, { foreignKey: "persona_id" });
Recepcionista.belongsTo(Personas);

module.exports = Personas;
