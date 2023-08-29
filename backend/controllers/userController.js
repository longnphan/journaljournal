const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

const authUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      res.json({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      console.log(err);
      res.status(401).json({ error: err.message });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
  }

  const user = await User.create({
    username,
    email,
    password,
    isAdmin,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { authUser, registerUser };
