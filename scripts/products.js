let main = document.querySelector(".mainpage");
let viewmore = document.querySelector("#ViewMore");
let page = 1;
let size = 10;
let search = document.querySelector("#search");
let searchbtn = document.querySelector("#searchbutton");
let sortby = document.querySelector("#sortbyy");
let ascdesc = document.querySelector("#ascdesc");
let min = document.querySelector("#min");
let max = document.querySelector("#max");
let category = document.querySelector("#category");

viewmore.addEventListener("click", () => {
  page++;
  fetch(
    `https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=${size}`,
  )
    .then((json) => json.json())
    .then((data) => {
      product(data.products);
    });
});
fetch(
  `https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=${size}`,
)
  .then((json) => json.json())
  .then((data) => {
    product(data.products);
  });
function product(arr) {
  arr.forEach((el) => {
    let box = document.createElement("div");
    box.classList.add("box");
    let firstbutton = document.createElement("button");
    let secondbutton = document.createElement("button");
    secondbutton.innerText = "View";
    firstbutton.innerText = "Add to Cart";
    box.innerHTML = `
       <div class="photo" style="background-image: url(${el.thumbnail});"></div>
        <h2>${el.title}</h2>
        <div class="flex"><h3>${el.price.current}${el.price.currency}</h3> <h6>Stock: ${el.stock}</h6> <h4>${el.rating}★</h4></div>
        `;
    box.append(firstbutton, secondbutton);
    main.appendChild(box);
    secondbutton.addEventListener("click", () => {
      window.location.href = `../html/details.html?page=${el._id}`;
    });
    firstbutton.addEventListener("click", () => {

  fetch("https://api.everrest.educata.dev/shop/cart/product", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: el._id,
      quantity: 1,
    }),
  })
  .then(resp => {

    if (!resp.ok) {
      return fetch("https://api.everrest.educata.dev/shop/cart/product", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: el._id,
        quantity: 1,
      }),
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }
    else {
      return resp.json()
    }

});
    });
  })}

searchbtn.addEventListener("click", () => {
  let url = `https://api.everrest.educata.dev/shop/products/search?page_index=${page}&page_size=${size}&sort_direction=${ascdesc.value}`;
  if (search.value.trim() !== "") {
    url += `&keywords=${encodeURIComponent(search.value.trim())}`;
  }
  if (sortby.value) {
    url += `&sort_by=${sortby.value}`;
  }
  if (min.value) {
    url += `&price_min=${min.value}`;
  }
  if (max.value) {
    url += `&price_max=${max.value}`;
  }
  if (category.value) {
    url += `&category_id=${category.value}`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      main.innerHTML = "";
      page = 1;
      product(data.products);
      console.log(data);
    });
});
