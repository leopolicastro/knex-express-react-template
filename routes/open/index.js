const router = require("express").Router();
const User = require("../../models/user");

// ***********************************************//
// Login a user
// ***********************************************//
router.post("/login", async (req, res) => {
  try {
    let user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await User.generateAuthToken(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
    });
    user = User.asJson(user);
    user.token = token;
    res.json(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ***********************************************//
// Create a user
// ***********************************************//
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  try {
    const token = await User.generateAuthToken(user);
    user.token = token;
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
    });
    res.status(201).json({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
