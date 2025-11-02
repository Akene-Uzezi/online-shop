const User = require("../models/user.models");
const authUtil = require("../util/authentications");
const validation = require("../util/validation");
const getSignup = async (req, res) => {
  res.render("customer/auth/signup");
};

const signup = async (req, res, next) => {
  if (
    !validation.userDetailsAreValid(
      req.body.username,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    validation.passwordIsConfirmed(req.body.password, req.body.confirmPassword)
  ) {
    res.redirect("/signup");
    return;
  }
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
    const existsAlready = await user.existsAlready();
    if (existsAlready) {
      res.redirect("/signup");
      return;
    }
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
