const express = require("express");
require("dotenv").config();
require("./models/database.js");
const app = express();
const User = require("./models/user");
const userRouter = require("./routes/user");
const { req, res } = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.json());
app.use(userRouter);

app.use((req, res, next) => {
  req.on("data", (chunk) => {
    const data = JSON.parse(chunk);
  });
  next();
});
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to backend!" });
});
app.listen(80, () => {
  console.log(`port is listening`);
});
