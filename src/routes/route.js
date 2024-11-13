const router = require("express").Router();

const { all, find, getSensorStats } = require("../controller/sensorController");

router.get("/stats", getSensorStats);
router.get("/:id", find);
router.get("/", all);

module.exports = router;
