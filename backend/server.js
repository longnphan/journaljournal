require("dotenv").config();
const cookieParser = require("cookie-parser");
const dmRoutes = require("./routes/dmRoutes");
const userRoutes = require("./routes/userRoutes");
const journalRoutes = require("./routes/journalRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

const connectDB = require("./config");
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/journal", journalRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dm", dmRoutes);

app.listen(PORT, () => {
  console.log("Listening to port:", PORT);
});
