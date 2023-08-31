const express = require("express");
const router = express.Router();
const { admin, protect } = require("../middleware/authMiddleware.js");
const {
  createJournal,
  getJournal,
  deleteJournal,
} = require("../controllers/journalController");

router.route("/").post(createJournal).get(getJournal);
router.route("/:id").delete(protect, deleteJournal);

module.exports = router;
