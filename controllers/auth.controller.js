const User = require("../models/user.models");
const authUtil = require("../util/authentications");
const validation = require("../util/validation");
const sessionFlash = require("../util/sessionflash");
const getSignup = async (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      username: "",
      password: "",
      confirmPassword: "",
      fullname: "",
      street: "",
      postal: "",
      city: "",
    };
  }

  res.render("customer/auth/signup", { inputData: sessionData });
};

const signup = async (req, res, next) => {
  const enteredData = {
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    confirmPassword: req.body.confirmPassword,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };
  if (
    !validation.userDetailsAreValid(
      req.body.username,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.passwordIsConfirmed(req.body.password, req.body.confirmPassword)
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Please Check your input. Password must be at least 5 characters long",
        ...enteredData,
      },
      () => {
        res.redirect("/signup");
      }
    );
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
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "Username exists",
          ...enteredData,
        },
        () => {
          res.redirect("/signup");
        }
      );
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
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      username: "",
      password: "",
    };
  }

  res.render("customer/auth/login", { inputData: sessionData });
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

  const sessionErrorData = {
    errorMessage: "Invalid credentials",
    username: user.username,
    password: user.password,
  };

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData, () => {
      res.redirect("/login");
    });
    return;
  }
  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );
  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, () => {
      res.redirect("/login");
    });
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
