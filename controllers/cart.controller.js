const Product = require("../models/product.model");

const addCartItem = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (err) {
    next(err);
    return;
  }
  const cart = res.locals.cart;

  cart.addItem(product);
  req.session.cart = cart;
  res.status(201).json({
    message: "Cart updated!",
    newTotalItems: cart.totalQuantity,
  });
};

module.exports = { addCartItem };
