const Order = require("../models/order.model");
const User = require("../models/user.models");
const Paystack = require("@paystack/paystack-sdk");
require("dotenv").config();
const paystack = new Paystack(process.env.paystackSecretKey);

const addOrder = async (cartData, uid) => {
  const cart = cartData;

  let userDocument;
  try {
    userDocument = await User.findById(uid);
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
  const cart = req.session.cart;
  try {
    console.log("DEBUG: User Found ->", user ? user.email : "NO USER FOUND");
    console.log(
      "DEBUG: Cart Found ->",
      cart ? cart.totalPrice : "NO CART FOUND",
    );

    if (!user || !cart) {
      console.error("Missing User or Cart data. Redirecting to cart.");
      return res.redirect("/cart");
    }
    const response = await paystack.transaction.initialize({
      email: user.email,
      amount: Math.round(Number(cart.totalPrice) * 100),
      currency: "NGN",
      first_name: user.name,
      phone: user.phone,
      callback_url: "http://localhost:3000/orders/verify",
      channels: ["card", "bank_transfer", "bank", "qr"],
      metadata: {
        cartData: cart,
        uid: user._id,
      },
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

const getVerify = async (req, res, next) => {
  try {
    const { reference } = req.query;
    if (!reference) {
      return res.status(400).render("user/auth/verify", {
        error: "No transaction reference",
        success: null,
      });
    }
    const response = await paystack.transaction.verify({ reference });
    if (response.status === true && response.data.status === "success") {
      const { cartData, uid } = response.data.metadata;
      if (cartData && cartData.totalPrice) {
        cartData.totalPrice = Number(cartData.totalPrice);
      }
      await addOrder(cartData, uid);
      req.session.cart = null;
      res.status(200).render("customer/auth/verify", {
        error: null,
        success: "Payment Successful",
      });
      return;
    } else {
      res.render("customer/auth/verify", {
        error: "Payment Abandoned",
        success: null,
      });
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports = { addOrder, getOrders, pay, getVerify };
