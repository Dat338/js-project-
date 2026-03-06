
let filter = document.querySelector("#filter")
let filterpage = document.querySelector(".filterpage")
let main = document.querySelector(".mainpage")


fetch("https://api.everrest.educata.dev/shop/products/all")
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
        <h3>${el.price.current}$</h3>
        <p>${el.description}</p>
        <button><a href="./html/details.html">buy</a></button>`
    });
}

filter.addEventListener("click", () => {
    filterpage.classList.add("gone")
})