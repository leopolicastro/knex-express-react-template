const ApplicationRecord = require("./applicationRecord");

class User extends ApplicationRecord {
  static tableName = "users";

  async generateAuthToken() {
    const user = this;
    const token = jwt.sign(
      { _id: user._id.toString(), name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
  }

  static findByCredentials = async (email, password) => {
    const user = await User.findBy({ email });
    if (!user) throw new Error("Unable to log in.");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Unable to login.");
    return user;
  };

  static async create(data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 8);
    }
    super.create(data);
  }

  static async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 8);
    }
    super.update(id, data);
  }
}

module.exports = User;
