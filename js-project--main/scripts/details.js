let product = document.querySelector("#product")
let id = window.location.search.split("=")[1]

fetch(`https://api.everrest.educata.dev/shop/products/id/${id}`)
.then(Resp => Resp.json())
.then(data => {
    console.log(data)
    productinfo(data)
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
    cart.addEventListener("click", ()=> {
        fetch(`https://api.everrest.educata.dev/shop/cart/product`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({
            
            id: obj._id,
            quantity: 1
            
        })})
        .then(resp => resp.json())
        .then(data => {console.log(data)})
    })
    
    product.appendChild(productinfo)
    productinfo.appendChild(cart)
}