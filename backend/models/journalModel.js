const mongoose = require("mongoose");

const inboxSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const entrySchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    user: {
      type: String,
      required: true,
    },
    inbox: [inboxSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);
