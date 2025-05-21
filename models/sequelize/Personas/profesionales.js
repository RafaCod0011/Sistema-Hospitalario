const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Profesionales = sequelize.define(
  "Profesionales",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: DataTypes.INTEGER,
    persona_id: { type: DataTypes.INTEGER, allowNull: true },
    profesional_salud: DataTypes.ENUM("Medico", "Enfermero"),
    especialidad_id: DataTypes.INTEGER,
    matricula: {
      type: DataTypes.STRING,
      unique: "uniq_profesionales_matricula",
    },
  },
  {
    sequelize,
    modelName: "profesional",
    tableName: "profesionales",
    underscored: true,
  }
);

module.exports = Profesionales;
