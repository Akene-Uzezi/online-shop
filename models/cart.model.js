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

  updateItem(product, newQuantity) {
    this.items.forEach((item) => {
      if (item.product._id === product._id && newQuantity > 0) {
        const cartItem = { ...item };
        const quantityChange = newQuantity - item.quantity;
        cartItem.quantity = newQuantity;
        cartItem.totalPrice = newQuantity * product.price;
        item = cartItem;

        this.totalQuantity += quantityChange;
        this.totalPrice += quantityChange * product.price;
        return { updatedItemPrice: cartItem.totalPrice };
      } else if (item.product._id === product._id && newQuantity === 0) {
        this.items.splice(item, 1);
        this.totalQuantity -= item.quantity;
        this.totalPrice -= item.totalPrice;
        return { updatedItemPrice: 0 };
      }
    });
  }
}

module.exports = Cart;
