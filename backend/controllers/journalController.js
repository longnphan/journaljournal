const Journal = require("../models/journalModel");
const asyncHandler = require("../middleware/asyncHandler");

const createJournal = asyncHandler(async (req, res) => {
  const entry = await Journal.create({ ...req.body });

  if (entry) {
    res.status(201).json(entry);
  } else {
    res.status(400);
    throw new Error("Journal entry was not created");
  }
});

const getJournal = asyncHandler(async (req, res) => {
  const entries = await Journal.find({});

  if (entries) {
    res.status(200).json(entries);
  } else {
    res.status(400);
    throw new Error("Journal entries not found");
  }
});

const deleteJournal = asyncHandler(async (req, res) => {
  const entry = await Journal.findOneAndDelete({ _id: req.params.id });

  if (entry) {
    res.status(200).json({ entry: "Journal entry was successfully deleted" });
  } else {
    res.status(400);
    throw new Error("Journal entry not found");
  }
});

module.exports = { createJournal, getJournal, deleteJournal };
