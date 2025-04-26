const router = require("express").Router();

const {
  all,
  find,
  create,
  update,
  deleted,
} = require("../controller/productController");

router.get("/:id", find);
router.get("/", all);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleted);

module.exports = router;
