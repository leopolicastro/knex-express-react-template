const router = require("express").Router(),
  { forgotPasswordEmail } = require("../../emails"),
  User = require("../../db/models/user"),
  bcrypt = require("bcryptjs");

// ***********************************************//
// Login a user
// ***********************************************//
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
    });
    res.json(user);
  } catch (e) {
    res.status(400).send();
  }
});

// ***********************************************//
// Create a user
// ***********************************************//
router.post("", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
