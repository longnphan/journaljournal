const jwt = require("jsonwebtoken");
const Dm = require("../models/dmModel");
const asyncHandler = require("../middleware/asyncHandler");

const createDm = asyncHandler(async (req, res) => {
  const message = await Dm.create({ ...req.body });

  if (message) {
    res.status(201).json(message);
  } else {
    res.status(400);
    throw new Error("DM was not created");
  }
});

// Get all direct messages
const getDms = asyncHandler(async (req, res) => {
  userId = req.headers.userid;

  const messages = await Dm.find({ to: userId });
  
  if (messages) {
    res.status(200).json(messages);
  } else {
    res.status(400);
    throw new Error("Messages not found");
  }
});


// Delete direct message
const deleteDm = asyncHandler(async (req, res) => {
  const message = await Dm.findOneAndDelete({ _id: req.params.id });

  if (message) {
    res.status(200).json({ message: "Message was successfully deleted" });
  } else {
    res.status(400);
    throw new Error("Message not found");
  }
});

// Update DM and mark it as read
const updateDm = asyncHandler(async (req, res) => {
  const message = await Dm.findOneAndUpdate(
    { _id: req.params.id },
    { read: true }
  );

  if (message) {
    res.status(200).json({ message: "Message was successfully updated" });
  } else {
    res.status(400);
    throw new Error("Message not found");
  }
});

// Get direct message by ID
const getDm = asyncHandler(async (req, res) => {
  const message = await Dm.find({ _id: req.params.id });

  if (message) {
    res.status(200).json(message);
  } else {
    res.status(400);
    throw new Error("Messages not found");
  }
});

module.exports = { createDm, getDms, getDm, deleteDm, updateDm };
