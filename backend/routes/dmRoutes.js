const express = require("express");
const router = express.Router();
const { admin, protect } = require("../middleware/authMiddleware.js");
const { createDm, getDm, deleteDm } = require("../controllers/dmController");

router.route("/").post(createDm).get(getDm);
router.route("/:id").delete(protect, deleteDm);

module.exports = router;
