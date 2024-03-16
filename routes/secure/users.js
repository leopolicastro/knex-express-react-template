const express = require("express"),
  User = require("../../models/user"),
  router = new express.Router();

// ***********************************************//
// Login Check
// ***********************************************//
router.post("/loginCheck", async (req, res) => res.sendStatus(200));

// ***********************************************//
// Logout a user
// ***********************************************//
router.delete("/logout", async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Logged out!" });
  } catch (e) {
    res.status(500).send();
  }
});

// ***********************************************//
// Get current user
// ***********************************************//
router.get("/me", async (req, res) => {
  let response = await User.asJson(req.user);
  res.json(response).status(200);
});

module.exports = router;
