const Products = require('../models/product.model')
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Products.findAll()
        res.render("customer/products/all-products", { products });
    } catch (err) {
        next(err)
    }
}

const getProductDetails = async (req, res, next) => {
    try {
        const product = await Products.findById(req.params.id)
        res.render('customer/products/product-details', {product})
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllProducts,
    getProductDetails
}
