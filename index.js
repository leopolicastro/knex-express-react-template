const express = require("express");
const app = express();
const userRoutes = require("./routes/open/index");
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;
app.use(morgan("dev"));
app.use(express.json());
// home route
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
