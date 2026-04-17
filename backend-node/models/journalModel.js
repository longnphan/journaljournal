const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    visibility: { type: String, default: "only me" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);
