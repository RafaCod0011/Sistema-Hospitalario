const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const AdmisionesMotivo = sequelize.define(
  "AdmisionesMotivo",
  {
    motivo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AdmisionesMotivo",
    tableName: "admisiones_motivo",
    underscored: true,
    timestamps: false,
  }
);

AdmisionesMotivo.associate = (models) => {
  AdmisionesMotivo.hasMany(models.Admision, {
    foreignKey: "motivo_id",
    as: "admisiones",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = AdmisionesMotivo;
