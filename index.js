const express = require("express");
const app = express();
const userRoutes = require("./routes/user");

const PORT = process.env.PORT || 5000;

// home route
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/api/users", userRoutes);

// get all posts data
app.get("/posts", (req, res) => {
  knex
    .select("*")
    .from("posts")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.send("Error getting posts data"));
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
