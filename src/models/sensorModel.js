const { DataTypes } = require("sequelize");
const database = require("../db/database");

const SensorData = database.define(
  "tb_cuaca",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    suhu: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    humid: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lux: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ts: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true, // Prevents Sequelize from renaming the table
    timestamps: false,
  }
);

module.exports = SensorData;
