const router = require("express").Router();
const User = require("../../models/user");

// ***********************************************//
// Login a user
// ***********************************************//
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log(user);
    const token = await User.generateAuthToken(user);
    console.log(token);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
    });
    user.token = token;
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
