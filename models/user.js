const ApplicationRecord = require("./applicationRecord");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class User extends ApplicationRecord {
  static tableName = "users";

  static async generateAuthToken(user) {
    const token = jwt.sign(
      { id: user.id.toString(), name: user.name },
      "supersecretprivatekey",
      { expiresIn: "24h" }
    );

    return token;
  }

  static async findByCredentials(email, password) {
    const user = await User.findBy({ email });
    if (!user) throw new Error("Unable to log in.");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Unable to login.");
    return user;
  }

  static async create(data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 8);
    }
    return super.create(data);
  }

  static async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 8);
    }
    return super.update(id, data);
  }
}

module.exports = User;
