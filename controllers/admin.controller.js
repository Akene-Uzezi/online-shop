const Product = require("../models/product.model");

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
    await product.save();
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

module.exports = {
  getProducts,
  getNewProduct,
  createNewProduct,
  getUpdateProduct,
  updateProduct,
};
