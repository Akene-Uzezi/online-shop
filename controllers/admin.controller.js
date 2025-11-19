const getProducts = (req, res) => {
  res.render("admin/products/all-products");
};

const getNewProduct = (req, res) => {
  res.render("admin/products/new-product");
};

const createNewProduct = (req, res) => {};

module.exports = {
  getProducts,
  getNewProduct,
  createNewProduct,
};
