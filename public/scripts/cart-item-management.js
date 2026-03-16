const cartItemManagementForms = document.querySelectorAll(
  ".cart-item-management",
);

cartItemManagementForms.forEach(async (formEl) => {
  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const productId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
    const quantity = form.firstElementChild.value;

    let response;
    try {
      response = await fetch("/cart/items", {
        method: "PATCH",
        body: JSON.stringify({
          productId,
          quantity,
          _csrf: csrfToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
      return;
    }
    if (!response.ok) {
      alert("Something went wrong!");
      return;
    }

    const responseData = await response.json();
    if (responseData.updatedCartData.updatedItemPrice === 0) {
      form.parentElement.parentElement.remove();
    } else {
      const cartItemTotalPriceElement =
        form.parentElement.querySelector(".cart-item-price");
      cartItemTotalPriceElement.textContent =
        responseData.updatedCartData.updatedItemPrice.toFixed(2);
    }

    const cartTotalPriceElement = document.getElementById("cart-total-price");
    cartTotalPriceElement.textContent =
      responseData.updatedCartData.newTotalPrice.toFixed(2);

    const cartBadge = document.querySelector(".nav-items .badge");
    cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
  });
});
