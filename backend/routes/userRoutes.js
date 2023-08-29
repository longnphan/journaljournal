const express = require("express");
const router = express.Router();
const { authUser, registerUser } = require("../controllers/userController.js");

router.route("/").post(registerUser);
router.post("/auth", authUser);

module.exports = router;
