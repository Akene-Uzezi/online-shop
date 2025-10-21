const getSignup = async (req, res) => {
  res.render("customer/auth/signup");
};

const getLogin = async (req, res) => {};

module.exports = {
  getSignup,
  getLogin,
};
