const db = require("../database/onlineshop");
const bcrypt = require("bcrypt");
class User {
  constructor(
    username,
    password,
    confirmPassword,
    fullname,
    street,
    postal,
    city
  ) {
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.fullname = fullname;
    this.address = {
      street,
      postal,
      city,
    };
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.getDb().collection("users").insertOne({
      username: this.username,
      password: hashedPassword,
      name: this.fullname,
      address: this.address,
    });
  }
}

module.exports = User;
