const db = require("../database/onlineshop");
const ObjectId = require("mongodb").ObjectId;

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // name of the image file
    if (this.image) {
      this.updateImage();
    }
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  async addNewProduct() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
      imagePath: `product-data/images/${this.image}`,
      imageUrl: `/products/assets/images/${this.image}`,
    };

    await db.getDb().collection("products").insertOne(productData);
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products;
  }

  updateImage() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
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
      imagePath: `product-data/images/${this.image}`,
      imageUrl: `/products/assets/images/${this.image}`,
    };

    if (this.id) {
      const productId = new ObjectId(this.id);

      if (!this.image) {
        delete productData.image;
        delete productData.imagePath;
        delete productData.imageUrl;
      }

      await db
        .getDb()
        .collection("products")
        .updateOne({ _id: productId }, { $set: productData });
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImage();
  }

  static remove(id) {
    const productId = new ObjectId(id);
    return db.getDb().collection("products").deleteOne({ _id: productId });
  }
}

module.exports = Product;
