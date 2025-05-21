const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const UsuarioRol = sequelize.define(
  "UsuarioRol",
  {
    usuario_id: { type: DataTypes.INTEGER, primaryKey: true },
    rol_id: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    sequelize,
    modelName: "UsuarioRol",
    tableName: "usuarios_roles",
    timestamps: false,
  }
);

UsuarioRol.associate = (models) => {
  UsuarioRol.belongsTo(models.Usuario, {
    foreignKey: "usuario_id",
    as: "usuario",
  });

  UsuarioRol.belongsTo(models.Rol, {
    foreignKey: "rol_id",
    as: "rol",
  });
};

module.exports = UsuarioRol;
