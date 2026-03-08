
let filter = document.querySelector("#filter")
let filterpage = document.querySelector(".filterpage")
let main = document.querySelector(".mainpage")
let viewmore = document.querySelector("#ViewMore")
let page = 1
let size = 10


viewmore.addEventListener("click", () => {
    page++
    fetch(`https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=${size}`)
    .then(json => json.json())
    .then(data => {
    product(data.products)
})
})
 fetch(`https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=${size}`)
.then(json => json.json())
.then(data => {
    product(data.products)
})
function product (arr) {
    arr.forEach(el => {
       let box = document.createElement("div")
       box.classList.add("box")
       main.appendChild(box)
       box.innerHTML = `
       <div class="photo" style="background-image: url(${el.thumbnail});"></div>
        <h2>${el.title}</h2>
        <h3>${el.price.current}${el.price.currency}</h3>
        <button><a href="./html/details.html">view</a></button>`
    });
}

