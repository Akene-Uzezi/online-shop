const cartItemManagementForms = document.querySelectorAll(
  ".cart-item-management",
);

cartItemManagementForms.forEach(async (form) => {
  form.addEventListener("submit", async (e) => {
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
          newQuantity: quantity,
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
  });
});
