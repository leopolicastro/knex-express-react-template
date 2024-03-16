const express = require("express"),
  router = new express.Router();

// ***********************************************//
// Login Check
// ***********************************************//
router.post("/loginCheck", async (req, res) => res.sendStatus(200));

// ***********************************************//
// Logout a user
// ***********************************************//
router.post("/logout", async (req, res) => {
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

router.get("/me", async (req, res) => {
  let response = req.user;
  delete response.password;
  delete response.created_at;
  delete response.updated_at;
  res.json(response).status(200);
});

module.exports = router;
