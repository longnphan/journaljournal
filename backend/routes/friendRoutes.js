const express = require("express");
const router = express.Router();
const { admin, protect } = require("../middleware/authMiddleware.js");
const {
  createFriend,
  getFriends,
  deleteFriend,
  updateFriend,
} = require("../controllers/friendController");

router.route("/").post(createFriend).get(getFriends);
router.route("/:id").patch(protect, updateFriend).delete(protect, deleteFriend);

module.exports = router;
