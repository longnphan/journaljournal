const Dm = require("../models/dmModel");
const asyncHandler = require("../middleware/asyncHandler");

const createDm = asyncHandler(async (req, res) => {
  const message = await Dm.create({ ...req.body });
  // const message = await Dm.create({ ...req.body, from: req.username });

  if (message) {
    res.status(201).json(message);
  } else {
    res.status(400);
    throw new Error("DM was not created");
  }
});

const getDm = asyncHandler(async (req, res) => {
  const messages = await Dm.find({});

  if (messages) {
    res.status(200).json(messages);
  } else {
    res.status(400);
    throw new Error("Messages not found");
  }
});

module.exports = { createDm, getDm };
