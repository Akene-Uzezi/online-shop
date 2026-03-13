const Product = require("../models/product.model");

const getCart = (req, res) => {
  res.render("customer/cart/cart");
};

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
const updateCartItem = async (req, res, next) => {
  const cart = res.locals.cart;
  const updatedItemData = cart.updateItem(
    req.body.productId,
    req.body.quantity,
  );
  req.session.cart = cart;
  res.json({
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
};

module.exports = { addCartItem, getCart, updateCartItem };
