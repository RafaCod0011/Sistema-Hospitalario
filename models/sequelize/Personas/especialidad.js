const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Especialidad = sequelize.define(
  "Especialidad",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Especialidad",
    tableName: "especialidad",
    underscored: true,
    timestamps: false,
  }
);

Especialidad.associate = (models) => {
  Especialidad.hasMany(models.Profesional, {
    foreignKey: "especialidad_id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  });
};

module.exports = Especialidad;
