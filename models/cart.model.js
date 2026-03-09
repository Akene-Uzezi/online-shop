class Cart {
    constructor(items = []) {
        this.items = items
    }

    addItem(product) {
        const cartItem = {
            product,
            quantity: 1,
            totalPrice: product.price
        }

        this.items.forEach((item) => {
            if(item.product._id === product._id) {
                cartItem.quantity = cartItem.quantity + 1
                cartItem.totalPrice += product.price
                item = cartItem
                return
            }
        })
        this.items.push(cartItem)
    }
}

module.exports = Cart