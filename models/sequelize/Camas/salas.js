const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Sala = sequelize.define(
  "Sala",
  {
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "uniq_salas_nombre",
    },
    descripcion: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Sala",
    tableName: "salas",
    underscored: true,
    timestamps: false,
  }
);

Sala.associate = (models) => {
  Sala.hasMany(models.Habitacion, {
    foreignKey: "sala_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = Sala;
