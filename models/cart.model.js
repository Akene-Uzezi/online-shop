class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const cartItem = {
      product,
      quantity: 1,
      totalPrice: product.price,
    };

    this.items.forEach((item) => {
      if (item.product._id === product._id) {
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        item = cartItem;

        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    });
    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }
}

module.exports = Cart;
