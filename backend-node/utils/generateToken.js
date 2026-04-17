const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  // 14 days * 86400 seconds in a day * 1000 milliseconds
  const twoWeeks = 14 * 86400 * 1000;

  // set JWT as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: twoWeeks,
  });
};

module.exports = generateToken;
