const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class Rol extends Model {}

Rol.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "Rol",
    tableName: "rol",
    timestamps: false,
  }
);

Rol.belongsToMany(sequelize.models.Usuario, {
  through: sequelize.models.UsuarioRol,
  foreignKey: "rol_id",
  otherKey: "usuario_id",
  as: "usuarios",
  onDelete: "CASCADE",
});

module.exports = Rol;
