const router = require("express").Router();

const { uploadImageProduct } = require("../controller/uploadController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Ini route yang kamu butuhkan:
router.post("/:id", upload.single("img_url"), uploadImageProduct);

module.exports = router;
