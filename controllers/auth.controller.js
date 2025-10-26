const User = require("../models/user.models");
const authUtil = require("../util/authentications");
const getSignup = async (req, res) => {
  res.render("customer/auth/signup");
};

const signup = async (req, res) => {
  const user = new User(
    req.body.username,
    req.body.password,
    req.body.confirmPassword,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  await user.signup();
  res.redirect("/login");
};

const getLogin = async (req, res) => {
  res.render("customer/auth/login");
};

const login = async (req, res) => {
  const user = new User(req.body.username, req.body.password);
  const existingUser = await user.getUserWithSameUsername();
  if (!existingUser) {
    res.redirect("/login");
    return;
  }
  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );
  if (!passwordIsCorrect) {
    res.redirect("/login");
    return;
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
};

module.exports = {
  getSignup,
  getLogin,
  signup,
  login,
};
