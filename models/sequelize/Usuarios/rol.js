const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Rol = sequelize.define(
  "Rol",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "unique_rol_nombre",
    },
  },
  {
    sequelize,
    modelName: "Rol",
    tableName: "rol",
    timestamps: false,
  }
);

Rol.associate = (models) => {
  Rol.belongsToMany(models.Usuario, {
    through: "usuarios_roles",
    foreignKey: "rol_id",
    otherKey: "usuario_id",
    as: "usuarios",
  });
};

module.exports = Rol;
