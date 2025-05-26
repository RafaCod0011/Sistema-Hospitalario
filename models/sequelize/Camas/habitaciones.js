const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Habitacion = sequelize.define(
  "Habitacion",
  {
    numero: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    capacidad: {
      type: DataTypes.INTEGER,
      validate: {
        isIn: [[1, 2]],
      },
    },
  },
  {
    sequelize,
    modelName: "Habitacion",
    tableName: "habitaciones",
    underscored: true,
    timestamps: false,
  }
);

Habitacion.associate = (models) => {
  Habitacion.belongsTo(models.Sala, {
    foreignKey: "sala_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Habitacion.hasMany(models.Cama, {
    foreignKey: "habitacion_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = Habitacion;
