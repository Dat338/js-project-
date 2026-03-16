let cart = document.querySelector(".cart")

fetch("https://api.everrest.educata.dev/shop/cart", {
    method : "GET",
    headers : {
        "Authorization": `Bearer ${accessToken}`
    }
})
.then(resp => resp.json())
.then(data => {
    console.log(data)})