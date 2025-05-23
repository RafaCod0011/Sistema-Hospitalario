const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Internacion = sequelize.define(
  "Internacion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    admision_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    cama_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM("en curso", "egresado"),
      allowNull: false,
      defaultValue: "en curso",
    },
  },
  {
    sequelize,
    modelName: "Internacion",
    tableName: "internaciones",
    underscored: true,
    timestamps: false,
  }
);

Internacion.associate = (models) => {
  Internacion.belongsTo(models.Admision, {
    foreignKey: "admision_id",
    as: "admision",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = Internacion;
