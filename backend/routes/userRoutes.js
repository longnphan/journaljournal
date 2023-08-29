const express = require("express");

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
const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

module.exports = router;
