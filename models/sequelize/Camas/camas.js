const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const Cama = sequelize.define(
  "Cama",
  {
    numero_en_habitacion: {
      type: DataTypes.INTEGER,
      validate: {
        isIn: [[1, 2]],
      },
    },
    estado: {
      type: DataTypes.ENUM("libre", "ocupado"),
      defaultValue: "libre",
    },
    higienizada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Cama",
    tableName: "camas",
    underscored: true,
    timestamps: false,
  }
);

Cama.associate = (models) => {
  Cama.belongsTo(models.Habitacion, {
    foreignKey: "habitacion_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Cama.hasOne(models.Internacion, {
    foreignKey: "cama_id",
    onDelete: "RESTRICT",
  });
};

module.exports = Cama;
