const express = require("express");
const router = express.Router();
const { admin, protect } = require("../middleware/authMiddleware.js");
const {
  createDm,
  getDms,
  getDm,
  deleteDm,
  updateDm,
} = require("../controllers/dmController");

router.route("/").post(createDm).get(getDms);
router
  .route("/:id")
  .get(getDm)
  .patch(updateDm)
  .delete(deleteDm);

module.exports = router;
