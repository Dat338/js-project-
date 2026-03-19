let cart = document.querySelector(".cart");
let deleteall = document.querySelector(".delete")
let totalprice = 0
let total = document.querySelector("#total")
let buy = document.querySelector(".buy")

fetch("https://api.everrest.educata.dev/shop/cart", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.products.forEach(el => {
      let _id = el.productId;
      let quantity = el.quantity;
      console.log(_id);
      console.log(quantity);
      fetch(`https://api.everrest.educata.dev/shop/products/id/${_id}`)
        .then((resp) => resp.json())
        .then((data) => {
          products(data, quantity);
          console.log(data)
        });
    });
  });

function products(obj, quantity) {
  let box = document.createElement("div");
  box.classList.add("box");
  let remove = document.createElement("button");
  remove.innerText = "delete item";
  remove.classList.add("delete");
  let plus = document.createElement("button");
let min = document.createElement("button");
let itemtotal = obj.price.current * quantity;
totalprice += itemtotal;
total.innerText = `Total: ${totalprice} ${obj.price.currency}`;

plus.innerText = "+";
min.innerText = "-";

let quantityText = document.createElement("h2");
quantityText.innerText = `quantity : ${quantity}`;

plus.addEventListener("click", () => {
  quantity++;

  fetch("https://api.everrest.educata.dev/shop/cart/product", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: obj._id,
      quantity: quantity,
    }),
  })
  .then(resp => resp.json())
  .then(data => console.log(data))

  window.location.reload()
  quantityText.innerText = `quantity : ${quantity}`;
});

min.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;

    fetch("https://api.everrest.educata.dev/shop/cart/product", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: obj._id,
        quantity: quantity,
      }),
    });


    window.location.reload()
    quantityText.innerText = `quantity : ${quantity}`;
  }
});
  
  box.innerHTML = `   
       <div class="photo" style="background-image: url(${obj.thumbnail});"></div>
       <h2>${obj.title}</h2>
       <div class="flex">
           <h3>${obj.price.current}${obj.price.currency}</h3>
           <h4>${obj.rating}★</h4>
       </div>
    `;
  remove.addEventListener("click", () => {
    fetch("https://api.everrest.educata.dev/shop/cart/product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id: obj._id }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        box.remove();
      })
      .catch((err) => console.log(err));
  });
  box.appendChild(remove);
  cart.appendChild(box);
  box.append(quantityText);
  box.append(plus, min);
}
deleteall.addEventListener("click", ()=> {
    fetch("https://api.everrest.educata.dev/shop/cart", {
        method : "DELETE",
        headers : {
            Authorization: `Bearer ${accessToken}`
        }
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        window.location.reload()
        Swal.fire({
            text: "Deleted successfuly",
            icon: "success",
            timer: 800,
            showConfirmButton: false
        });
    }) 
})
buy.addEventListener("click", ()=> {
fetch("https://api.everrest.educata.dev/shop/cart/checkout", {
  method : "POST",
  headers : {
    Authorization: `Bearer ${accessToken}`,
  }
}).then(resp => resp.json())
.then(data => console.log(data))
  Swal.fire({
            text: `succesfuly bought `,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
  setTimeout(() => {
    window.location.reload()
  }, 1500);
})
