const User = require("../models/user.models");
const authUtil = require("../util/authentications");
const getSignup = async (req, res) => {
  res.render("customer/auth/signup");
};

const signup = async (req, res, next) => {
  const user = new User(
    req.body.username,
    req.body.password,
    req.body.confirmPassword,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );
  try {
    await user.signup();
  } catch (err) {
    next(err);
    return;
  }
  res.redirect("/login");
};

const getLogin = async (req, res) => {
  res.render("customer/auth/login");
};

const login = async (req, res, next) => {
  const user = new User(req.body.username, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameUsername();
  } catch (err) {
    next(err);
    return;
  }
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

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

module.exports = {
  getSignup,
  getLogin,
  signup,
  login,
  logout,
};
