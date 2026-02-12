const deleteProductBtnElements = document.querySelectorAll(
  ".product-item button"
);

deleteProductBtnElements.forEach((deleteProductBtnElement) => {
  deleteProductBtnElement.addEventListener("click", async (e) => {
    const button = e.target;
    const productId = button.dataset.productid;
    const crsfToken = button.dataset.csrf;

    const response = await fetch(
      "/admin/products/" + productId + "?_csrf=" + crsfToken,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      alert("Something went wrong!");
      return;
    }

    button.parentElement.parentElement.parentElement.parentElement.remove();
  });
});
