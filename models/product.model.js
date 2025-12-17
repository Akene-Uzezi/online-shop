const db = require("../database/onlineshop");
const ObjectId = require("mongodb").ObjectId;

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // name of the image file
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products;
  }

  static async findById(productId) {
    const prodId = new ObjectId(productId);
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });
    return product;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
      imagePath: this.imagePath,
      imageUrl: this.imageUrl,
    };
    await db.getDb().collection("products").insertOne(productData);
  }
}

module.exports = Product;
