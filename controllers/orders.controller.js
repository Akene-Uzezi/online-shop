const Order = require("../models/order.model");
const User = require("../models/user.models");

const addOrder = async (req, res, next) => {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (err) {
    next(err);
    return;
  }

  const order = new Order(cart, userDocument);
  try {
    await order.save();
  } catch (err) {
    next(err);
    return;
  }

  req.session.cart = null;

  res.redirect("/orders");
};

const getOrders = (req, res) => {
  res.render("customer/orders/all-orders");
};

module.exports = { addOrder, getOrders };
