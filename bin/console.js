const Repl = require("repl");

const User = require("../db/models/User.js");
const Post = require("../db/models/Post.js");

const prompt = "- $ ";

// Start the REPL
const repl = Repl.start({ prompt });

// Add the models to the REPL context
repl.context.User = User;
repl.context.Post = Post;

repl.on("exit", () => {
  process.exit();
});
