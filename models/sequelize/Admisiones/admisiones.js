const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Admision = sequelize.define(
  "Admision",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    identidad_medica_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recepcionista_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_admision: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    motivo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Admision",
    tableName: "admisiones",
    underscored: true,
    timestamps: false,
  }
);

Admision.associate = (models) => {
  Admision.belongsTo(models.IdentidadMedica, {
    foreignKey: "identidad_medica_id",
    as: "identidad_medica",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Admision.belongsTo(models.Recepcionista, {
    foreignKey: "recepcionista_id",
    as: "recepcionista",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Admision.belongsTo(models.AdmisionesMotivo, {
    foreignKey: "motivo_id",
    as: "motivo",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = Admision;
