const ProdukData = require("../models/productModel");
const { Op, fn, col } = require("sequelize"); // Import Sequelize utilities
const database = require("../db/database"); // Import your database connection instance

exports.all = async (req, res) => {
  try {
    const result = await ProdukData.findAll();
    return res.status(200).json({
      status: 200,
      success: true,
      message: "ok",
      data: {
        result,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "internal server error",
      data: null,
      error: "Internal Server Error",
    });
  }
};

exports.find = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProdukData.findOne({
      where: {
        id: id,
      },
    });

    if (!result) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found",
        data: null,
        error: "Product Not Found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "ok",
      data: {
        result: result,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "internal server error",
      data: null,
      error: "Internal Server Error",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      id,
      nama,
      tinggi,
      lebar,
      kapasitas,
      telur,
      pass_access,
      price,
      active,
      // img_url,
    } = req.body; // created_at gak perlu diambil dari body

    const newProduct = await ProdukData.create({
      id,
      nama,
      tinggi,
      lebar,
      kapasitas,
      telur,
      pass_access,
      price,
      active,
      // img_url,
      created_at: new Date(), // otomatis isi tanggal sekarang
    });

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Product created successfully",
      data: {
        result: newProduct,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      data: null,
      error: "Internal Server Error",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nama,
      tinggi,
      lebar,
      kapasitas,
      telur,
      pass_access,
      price,
      active,
      // img_url,
    } = req.body;

    const product = await ProdukData.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found",
        data: null,
        error: "Product Not Found",
      });
    }

    await product.update({
      nama,
      tinggi,
      lebar,
      kapasitas,
      telur,
      pass_access,
      price,
      active,
      // img_url,
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product updated successfully",
      data: {
        result: product,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      data: null,
      error: "Internal Server Error",
    });
  }
};

exports.deleted = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProdukData.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found",
        data: null,
        error: "Product Not Found",
      });
    }

    await product.destroy();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Product deleted successfully",
      data: null,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      data: null,
      error: "Internal Server Error",
    });
  }
};
