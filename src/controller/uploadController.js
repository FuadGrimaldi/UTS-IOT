const fs = require("fs");
const { s3 } = require("../../config/awsS3");
const ProdukData = require("../models/productModel");

exports.uploadImageProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const fileContent = fs.readFileSync(req.file.path);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `produk/${Date.now()}_${req.file.originalname}`, // Nama file unik di S3
      Body: fileContent,
      ContentType: req.file.mimetype,
    };

    s3.upload(params, async (err, data) => {
      fs.unlinkSync(req.file.path); // Hapus file lokal setelah upload

      if (err) {
        console.error("Error uploading to S3:", err);
        return res.status(500).json({
          status: 500,
          success: false,
          message: "Error uploading image",
          data: null,
          error: err.message,
        });
      }

      // Update img_url di database produk
      const result = await ProdukData.update(
        { img_url: data.Location },
        { where: { id } }
      );

      if (result[0] === 0) {
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
        message: "Image uploaded successfully",
        data: {
          img_url: data.Location,
        },
        error: null,
      });
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
