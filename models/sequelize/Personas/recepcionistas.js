const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Recepcionista = sequelize.define(
  "Recepcionista",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "recepcionista",
    tableName: "recepcionistas",
    underscored: true,
  }
);
Recepcionista.associate = (models) => {
  Recepcionista.belongsTo(models.Persona, {
    foreignKey: {
      name: "persona_id",
      allowNull: true,
      unique: "uniq_persona_recepcionista",
    },
    as: "persona",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
};

module.exports = Recepcionista;
