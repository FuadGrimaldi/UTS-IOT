const { DataTypes } = require("sequelize");
const database = require("../db/database");

const ProductData = database.define(
  "product",
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tinggi: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lebar: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    kapasitas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    telur: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pass_access: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    active: {
      type: DataTypes.ENUM("Y", "N"),
      allowNull: true,
    },
    img_url: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "produk", // Sesuai nama tabel kamu
    timestamps: false, // Karena kamu hanya ada `created_at`, tidak ada `updated_at`
  }
);

module.exports = ProductData;
