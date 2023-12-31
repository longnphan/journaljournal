const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userController.js");
const { admin, protect } = require("../middleware/authMiddleware.js");

router.route("/").post(registerUser).get(getUsers);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

module.exports = router;
