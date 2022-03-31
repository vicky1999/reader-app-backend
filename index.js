const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// Routers...
const adminRouter = require("./routers/user");

const app = express();
app.use(cors());
app.use(express.json());

const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.on("open", () => {
  console.log("Connected to DB!");
});

app.use("/user", adminRouter);

app.listen(8000, () => {
  console.log("Backend Started!!");
});
