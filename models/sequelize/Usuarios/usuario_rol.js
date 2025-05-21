const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class UsuarioRol extends Model {}

UsuarioRol.init(
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

if (sequelize.models.Usuario) {
  UsuarioRol.belongsTo(sequelize.models.Usuario, {
    foreignKey: "usuario_id",
    as: "usuario",
    onDelete: "CASCADE",
  });
}
if (sequelize.models.Rol) {
  UsuarioRol.belongsTo(sequelize.models.Rol, {
    foreignKey: "rol_id",
    as: "rol",
    onDelete: "CASCADE",
  });
}

module.exports = UsuarioRol;
