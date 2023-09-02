const express = require("express");
const router = express.Router();
const { admin, protect } = require("../middleware/authMiddleware.js");
const {
  createJournal,
  getJournal,
  deleteJournal,
  updateJournal,
} = require("../controllers/journalController");

router.route("/").post(createJournal).get(getJournal);
router.route("/:id").delete(protect, deleteJournal).put(protect, updateJournal);

module.exports = router;
