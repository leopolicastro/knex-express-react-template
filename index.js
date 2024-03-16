const express = require("express");
const app = express();
const openRoutes = require("./routes/open/index");
const userRoutes = require("./routes/secure/users");
const morgan = require("morgan");
const passport = require("./middleware/authentication");

const PORT = process.env.PORT || 5000;
app.use(morgan("dev"));
app.use(express.json());
// home route
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/users", openRoutes);

app.use(
  passport.authenticate("jwt", {
    session: false,
  })
);

app.use("/users", userRoutes);

app.get("/protected", (req, res) => {
  res.json({ user: req.user });
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
