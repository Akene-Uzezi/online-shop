const Product = require("../models/product.model");
const Order = require('../models/order.model')

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products });
  } catch (err) {
    next(err);
    return;
  }
};

const getNewProduct = (req, res) => {
  res.render("admin/products/new-product");
};

const createNewProduct = async (req, res) => {
  const product = new Product({ ...req.body, image: req.file.filename });

  try {
    await product.addNewProduct();
  } catch (err) {
    next(err);
    return;
  }

  res.redirect("/admin/products");
};

const getUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("admin/products/update-product", { product });
};

const updateProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  await product.save();

  res.redirect("/admin/products");
};

const deleteProduct = async (req, res, next) => {
  let product;
  try {
    await Product.remove(req.params.id);
  } catch (err) {
    return next(err);
  }

  res.json({ message: "Deleted product!" });
};

const getOrders = async (req, res) => {
  const orders = await Order.findAll()
  res.render('admin/orders/admin-orders', {orders})
}

const updateOrders = async (req, res, next) => {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;
  try{
    const order = await Order.findById(orderId);
    order.status = newStatus
    await order.save()
    res.json({ message: 'Order Updated', newStatus })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = {
  getProducts,
  getNewProduct,
  createNewProduct,
  getUpdateProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrders
};
