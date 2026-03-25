const Order = require("../models/order.model");
const User = require("../models/user.models");
const Paystack = require("@paystack/paystack-sdk");
require("dotenv").config();
const paystack = new Paystack(process.env.paystackSecretKey);

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

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", { orders });
  } catch (err) {
    next(err);
  }
};

const pay = async (req, res, next) => {
  const user = await User.findById(req.session.uid);
  const cart = res.locals.cart;
  try {
    const response = await paystack.transaction.initialize({
      email: user.email,
      amount: Math.round(Number(cart.totalPrice) * 100),
      currency: "NGN",
      callback_url: "http://localhost:3000/verify",
      channels: ["card", "bank_transfer"],
    });

    if (response.status === true) {
      const paystackUrl = await response.data.authorization_url;
      res.redirect(paystackUrl);
      return;
    } else {
      console.log(response.message);
      res.redirect("/cart");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { addOrder, getOrders, pay };
