const express = require("express");
const router = express.Router();
const { createDm, getDm } = require("../controllers/dmController");

router.route("/").post(createDm).get(getDm);

module.exports = router;
