const addToCartBtn = document.querySelector("#product-details button");
const badge = document.querySelector(".nav-items .badge");

addToCartBtn.addEventListener("click", async (e) => {
  let response;
  const csrfToken = addToCartBtn.dataset.csrf;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: addToCartBtn.dataset.productid,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return;
  }
  if (!response.ok) {
    alert("Something went wrong");
    return;
  }
  const responseData = await response.json();
  const newTotalQuantity = responseData.newTotalItems;
  badge.textContent = newTotalQuantity;
});
