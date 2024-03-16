const express = require("express"),
  router = new express.Router(),
  User = require("../../models/user");

// ***********************************************//
// Login Check
// ***********************************************//
router.post("/api/loginCheck", async (req, res) => res.sendStatus(200));

// ***********************************************//
// Logout a user
// ***********************************************//
router.post("/api/users/logout", async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.clearCookie("jwt");
    res.json({ message: "Logged out!" });
  } catch (e) {
    res.status(500).send();
  }
});

// ***********************************************//
// Get current user
// ***********************************************//

router.get("/api/users/me", async (req, res) => {
  res.json(req.user);
});

module.exports = router;
