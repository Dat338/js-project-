let product = document.querySelector("#product")
let id = window.location.search.split("=")[1]
let left = document.querySelector(".left")
let right = document.querySelector(".right")
let photos = document.querySelector(".photos")

fetch(`https://api.everrest.educata.dev/shop/products/id/${id}`)
.then(Resp => Resp.json())
.then(data => {
    console.log(data)
    photoss(data.images)
})

function photoss (arr) {
    arr.forEach(el => {
        let photo = document.createElement("img")
        photo.src = el

        photos.appendChild(photo)
    });
} 