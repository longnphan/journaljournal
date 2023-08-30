const mongoose = require("mongoose");

const journalSchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);
