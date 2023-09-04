const jwt = require("jsonwebtoken");
const Friend = require("../models/friendModel");
const asyncHandler = require("../middleware/asyncHandler");

// Get all friends whether they are approved or not
const getFriends = asyncHandler(async (req, res) => {
  token = req.cookies.jwt;
  const { userId } = jwt.verify(token, process.env.JWT_SECRET);

  const friends = await Friend.find({
    $or: [{ userId }, { friendId: userId }],
  });

  if (friends) {
    res.status(200).json(friends);
  } else {
    res.status(400);
    throw new Error("Friends not found");
  }
});

// Delete Friend by ID
const deleteFriend = asyncHandler(async (req, res) => {
  const friend = await Friend.findOneAndDelete({ _id: req.params.id });

  if (friend) {
    res.status(200).json({ friend: "Friend was successfully deleted" });
  } else {
    res.status(400);
    throw new Error("Friend not found");
  }
});

// Update Friend by ID
const updateFriend = asyncHandler(async (req, res) => {
  const friend = await Friend.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );

  if (friend) {
    res.status(200).json({ entry: "Friend was successfully updated" });
  } else {
    res.status(400);
    throw new Error("Friend not found");
  }
});

const createFriend = asyncHandler(async (req, res) => {
  const friend = await Friend.create({ ...req.body });

  if (friend) {
    res.status(201).json(friend);
  } else {
    res.status(400);
    throw new Error("Friend was not created");
  }
});

module.exports = { createFriend, getFriends, deleteFriend, updateFriend };
