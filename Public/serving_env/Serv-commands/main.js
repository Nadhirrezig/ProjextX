//----------declarations-------------------//

let btn = document.getElementById("btn");
let header = document.getElementsByTagName("header")[0];
let container = document.querySelector(".orders");

//----------------data ---------------------------//

let employ ="foulen ben foulen"


const table ={
  tabn:4,
  order:"cafe expresso-canette-jus-jus",
  price:12
}

//---------------listing order---------------------//

const items = table.order.split("-");
const counts = {};
for (const item of items) {
    counts[item] = (counts[item] || 0) + 1;
  }

  const results = [];
  for (const category in counts) {
    results.push(`${counts[category]} ${category}`);
  }




//----------------header------------------//
let enserv="en service:"+employ;
let employe = document.createElement("h2");
employe.innerHTML = enserv;
header.appendChild(employe);

//----------------fonctionTime-------------//

let span = document.createElement("h3");


function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  span.innerHTML = 
    ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
}

setInterval(time, 1000);


header.appendChild(span);

//----------------display cards------------//

btn.onclick = () => {
  let card = document.createElement("div");
  card.classList.add("card");

  // Table number
  let numc = document.createElement("h1");
  numc.textContent = `Table: ${table.tabn}`;

  // Order details
  let orderContainer = document.createElement("div");
  for (const result of results) {
    let orderItem = document.createElement("p");
    orderItem.textContent = result; // Each result goes into its own <p>
    orderContainer.appendChild(orderItem);
  }

  // Price
  let prix = document.createElement("h1");
  prix.textContent = `Prix: ${table.price}$`;

  // Append elements to the card
  card.appendChild(numc);
  card.appendChild(orderContainer); // Add the order container with <p> items
  card.appendChild(prix);

  // Add the card to the container
  container.appendChild(card);

  // Remove the card after 10 seconds
  setTimeout(() => {
    card.remove();
  }, 5000);
};



