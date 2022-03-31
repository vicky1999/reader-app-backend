const express = require("express");
const router = express.Router();

// Models...
const Users = require("../models/user");

router.get("/login", async (req, res) => {
  try {
    const users = await Users.find({
      email: req.body.email,
      password: req.body.password,
      admin: req.body.admin,
    });
    res.status(200);
    const response = {
      response: users,
    };
    res.json(response);
  } catch (err) {
    res.status(500);
    let response = {
      error: err.message,
    };
    res.json(response);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      admin: req.body.admin,
    });
    const existingUser = await Users.find({
      email: req.body.email,
      admin: req.body.admin,
    });
    if (existingUser.length > 0) {
      res.status(406);
      let response = {
        error: "Email already exist",
      };
      res.json(response);
    } else {
      let newUser = await user.save();
      res.status(200);
      let response = {
        response: newUser,
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    const response = {
      error: err.message,
    };
    res.json(response);
  }
});

module.exports = router;
