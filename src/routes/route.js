const router = require("express").Router();

const {
  all,
  find,
  getSensorStats,
  create,
} = require("../controller/sensorController");

router.get("/stats", getSensorStats);
router.get("/store", create);
router.get("/:id", find);
router.get("/", all);

module.exports = router;
