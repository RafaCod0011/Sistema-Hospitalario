const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Profesionales = sequelize.define(
  "Profesional",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
Profesionales.associate = (models) => {
  console.log(
    "Ejecutando asociación para Profesional con modelos:",
    Object.keys(models)
  );
  Profesionales.belongsTo(models.Especialidad, {
    foreignKey: "especialidad_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  });
  Profesionales.belongsTo(models.Persona, {
    foreignKey: {
      name: "persona_id",
      allowNull: true,
      unique: "uniq_persona_profesional",
    },
    as: "persona",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
};

module.exports = Profesionales;
