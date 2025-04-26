const { DataTypes } = require("sequelize");
const database = require("../db/database");

const SensorData = database.define(
  "data_produk",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_produk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    suhu: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    humid: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    gas: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    lampu: {
      type: DataTypes.ENUM,
      values: ["ON", "OFF"], // Hanya menerima nilai "ON" atau "OFF"
      allowNull: false,
      defaultValue: "OFF", // Default status lampu
    },
    fan: {
      type: DataTypes.ENUM,
      values: ["ON", "OFF"], // Hanya menerima nilai "ON" atau "OFF"
      allowNull: false,
      defaultValue: "OFF", // Default status fan
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
