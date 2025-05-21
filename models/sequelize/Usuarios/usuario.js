const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "uniq_usuario_username",
    },
    password: { type: DataTypes.STRING(255), allowNull: false },
    correo: { type: DataTypes.STRING(100), allowNull: true },
    creado_en: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "creado_en",
    },
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuarios",
    timestamps: false,
  }
);

Usuario.associate = (models) => {
  Usuario.belongsToMany(models.Rol, {
    through: "usuarios_roles",
    foreignKey: "usuario_id",
    otherKey: "rol_id",
    as: "roles",
  });
};

module.exports = Usuario;
