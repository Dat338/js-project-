let product = document.querySelector("#product")
let main = document.querySelector("main")
let id = window.location.search.split("=")[1]
let rating = document.querySelector("#rating")
let numberinput = document.querySelector("#number")
let sumbit = document.querySelector("#Sumbit")

fetch(`https://api.everrest.educata.dev/shop/products/id/${id}`)
.then(Resp => Resp.json())
.then(data => {
    console.log(data)
    productinfo(data)
    reviews(data.ratings)
})

function productinfo (obj) {
    let productinfo = document.createElement("div")
    let cart = document.createElement("button")
    cart.classList.add("bluebutton")
    cart.innerText = 'add to cart'
    productinfo.innerHTML = `            
            <img src="${obj.thumbnail}" alt="">
            <div class="title">
            <h2>${obj.title}</h2>
            <p>${obj.price.current}${obj.price.currency}</p>
            </div>
            <h4>stock : ${obj.stock}</h4>
            <h4>Brand : ${obj.brand}</h4>
            <h4>Warranty: ${obj.warranty}</h4>
            <p>Description :${obj.description}</p>`
cart.addEventListener("click", () => {

  // POST first
  fetch("https://api.everrest.educata.dev/shop/cart/product", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: obj._id,
      quantity: 1,
    }),
  })
  .then(resp => {
    if (!resp.ok) {

      return fetch("https://api.everrest.educata.dev/shop/cart", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => res.json())
      .then(cart => {
        let products = cart.products || cart.items || [];
        let item = products.find(p => 
          p.productId === obj._id || p.productId?._id === obj._id
        );

        if (!item) {
          console.log("Item not found in cart", products);
          Swal.fire({
            icon: "error",
            title: "Cannot update cart",
          });
          return;
        }
        return fetch("https://api.everrest.educata.dev/shop/cart/product", {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: obj._id,
            quantity: item.quantity + 1, 
          }),
        });
      });
    } else {
      return resp.json();
    }

  })
  .then(() => {
    Swal.fire({
      icon: "success",
      title: "Added to cart 🛒",
      text: "Product quantity updated!",
      timer: 1500,
      showConfirmButton: false
    });
  })
  .catch(() => {
    Swal.fire({
      icon: "error",
      title: "Not in stock"
    });
  });

});
    
    product.appendChild(productinfo)
    productinfo.appendChild(cart)
}
function reviews (arr) {
  arr.forEach(el => {
    fetch(`https://api.everrest.educata.dev/auth/id/${el.userId}`, {
      method : "GET",
      headers : {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
              usercomment(data, el)
    })
    
  });
}
function usercomment(user, review) {
  let prof = document.createElement("div")
  if (user.avatar == undefined) {
    return
  }
  prof.innerHTML = `
    <img src="${user.avatar}" alt="">
    <h2>${user.firstName}</h2>
    <h3>${"⭐".repeat(review.value)}</h3>
  `
  main.appendChild(prof)
}
sumbit.addEventListener("click", ()=> {
  fetch("https://api.everrest.educata.dev/shop/products/rate", {
    method : "POST",
    headers : {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body : JSON.stringify({
        productId: id,
        rate: numberinput.value
      })
  })
  .then(resp => resp.json())
  .then(data => {
    {
      window.location.reload()
      console.log(data)
    }
  })
  .catch(err => console.log(err))

})
