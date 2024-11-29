//////////////////////////////////////////////////////////////////////Menu Page\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const menu = [
    { id: 1, name: "jus", price: 2, img: "srcIMG/jus.jpg" },
    { id: 2, name: "soda", price: 3.5, img: "srcIMG/canette.jpg" },

  ];
////////////////////////////////////////////////////////////////////////Load menu items\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  let order = [];
const menuContainer = document.getElementById("menu");
menu.forEach((item) => {
  const menuItem = document.createElement("div");
  menuItem.classList.add("menu-item");
  menuItem.innerHTML = `
    <img src="${item.img}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>$${item.price.toFixed(2)}</p>
    <button onclick="addToOrder(${item.id})" class="order-button">Add to Order</button>
  `;
  menuContainer.appendChild(menuItem);
});
//////////////////////////////////////////////////////////////////////Add item to order\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  function addToOrder(itemId) {
    const item = menu.find((menuItem) => menuItem.id === itemId);
    order.push(item);
    renderOrder();
  }
//////////////////////////////////////////////////////////////////////Render order list\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function renderOrder() {
  const orderList = document.getElementById("order-list");
  const total = document.getElementById("total");
  
  if (order.length === 0) {
    orderList.innerHTML = `<p>No items in your order yet.</p>`;
    total.textContent = "0.00";
    return;
  }
  
  orderList.innerHTML = "";
  let totalPrice = 0;
  
  order.forEach((item, index) => {
    const orderItem = document.createElement("div");
    orderItem.classList.add("order-item");
    orderItem.innerHTML = `
      <p>${item.name} - $${item.price.toFixed(2)}</p>
      <button onclick="removeFromOrder(${index})" class="order-button">Remove</button>
    `;
    orderList.appendChild(orderItem);
    totalPrice += item.price;
  });
  
  total.textContent = totalPrice.toFixed(2);
}
//////////////////////////////////////////////////////////////////////Remove item from order\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function removeFromOrder(index) {
  order.splice(index, 1);
  renderOrder();
}
//////////////////////////////////////////////////////////////////////Simulate order submission\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
document.getElementById("submit-order").addEventListener("click", () => {
  if (order.length === 0) {
    alert("Your order is empty!");
    return;
  }
  alert("Order placed successfully!");
  console.log(order);
  order = [];
  renderOrder();
});