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

    // find existing item by id and update in-place by index
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product._id.toString() === product._id.toString()) {
        const updated = {
          ...item,
          quantity: item.quantity + 1,
          totalPrice: item.totalPrice + product.price,
        };
        this.items[i] = updated;

        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }

    // not found -> add new
    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }

  updateItem(product, newQuantity) {
    // use index loop so `return` returns from the method
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (
        item.product._id.toString() === product._id.toString() &&
        newQuantity > 0
      ) {
        const cartItem = { ...item };
        const quantityChange = newQuantity - item.quantity;
        cartItem.quantity = newQuantity;
        cartItem.totalPrice = newQuantity * product.price;
        this.items[i] = cartItem;

        this.totalQuantity += quantityChange;
        this.totalPrice += quantityChange * product.price;
        return { updatedItemPrice: cartItem.totalPrice };
      } else if (
        item.product._id.toString() === product._id.toString() &&
        newQuantity === 0
      ) {
        // remove by index
        this.items.splice(i, 1);
        this.totalQuantity -= item.quantity;
        this.totalPrice -= item.totalPrice;
        return { updatedItemPrice: 0 };
      }
    }

    // nothing updated
    return null;
  }
}

module.exports = Cart;
