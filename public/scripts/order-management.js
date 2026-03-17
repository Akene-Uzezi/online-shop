const updateOrderFormElements = document.querySelectorAll(
  ".order-actions form",
);

async function updateOrder(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const newStatus = formData.get("status");
  const orderId = formData.get("orderid");
  const csrfToken = formData.get("_csrf");
  let response;
  try {
    response = await fetch(`/admin/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ newStatus, _csrf: csrfToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    alert("Something went wrong. Please try again later.");
    console.log(err);
  }
}
