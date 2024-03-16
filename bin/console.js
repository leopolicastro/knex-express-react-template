const Repl = require("repl");

const User = require("../models/user.js");

const prompt = "- $ ";

// Start the REPL
const repl = Repl.start({ prompt });

// Add the models to the REPL context
repl.context.User = User;

repl.on("exit", () => {
  process.exit();
});
