const jwt = require("jsonwebtoken");
const Journal = require("../models/journalModel");
const asyncHandler = require("../middleware/asyncHandler");

// Get all journal entries by user
const getJournal = asyncHandler(async (req, res) => {
  const user = req.userId;

  const entries = await Journal.find({ user });

  if (entries) {
    res.status(200).json(entries);
  } else {
    res.status(400);
    throw new Error("Journal entries not found");
  }
});

// Get friend journal by friend ID
const getJournalByID = asyncHandler(async (req, res) => {
  const entries = await Journal.find({ userId: req.params.id });

  if (entries) {
    res.status(200).json(entries);
  } else {
    res.status(400);
    throw new Error("Journal entries not found");
  }
});

// Delete Journal entry by ID
const deleteJournal = asyncHandler(async (req, res) => {
  const entry = await Journal.findOneAndDelete({ _id: req.params.id });

  if (entry) {
    res.status(200).json({ entry: "Journal entry was successfully deleted" });
  } else {
    res.status(400);
    throw new Error("Journal entry not found");
  }
});

// Update Journal entry by ID
const updateJournal = asyncHandler(async (req, res) => {
  const entry = await Journal.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );

  if (entry) {
    res.status(200).json({ entry: "Entry was successfully updated" });
  } else {
    res.status(400);
    throw new Error("Entry not found");
  }
});

const createJournal = asyncHandler(async (req, res) => {
  const entry = await Journal.create({ ...req.body });

  if (entry) {
    res.status(201).json(entry);
  } else {
    res.status(400);
    throw new Error("Journal entry was not created");
  }
});

module.exports = {
  createJournal,
  getJournal,
  getJournalByID,
  deleteJournal,
  updateJournal,
};
