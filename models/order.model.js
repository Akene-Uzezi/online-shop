const db = require("../database/onlineshop");
const mongodb = require("mongodb");
class Order {
  // Status => pending, fulfilled, cancelled
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        mongth: "long",
        year: "numeric",
      });
    }
    this.id = orderId;
  }

  save() {
    const orderDocument = {
      userData: this.userData,
      productData: this.productData,
      date: new Date(),
      status: this.status,
    };

    const ordersCollection = db.getDb().collection("orders");

    if (this.id) {
      // update existing order
      const orderId = new mongodb.ObjectId(this.id);
      return ordersCollection.updateOne(
        { _id: orderId },
        { $set: orderDocument },
      );
    }

    // insert new order and set the generated id on this instance
    return ordersCollection.insertOne(orderDocument).then((result) => {
      this.id = result.insertedId;
      return result;
    });
  }
}

module.exports = Order;
