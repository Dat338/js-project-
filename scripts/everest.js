const laptops = document.querySelector(".laptops");
let position = 0;
let speed = 1;
let animId;
fetch(`https://api.everrest.educata.dev/shop/products/category/1?page_index=1&page_size=20`)
  .then(resp => resp.json())
  .then(data => {
    renderProducts(data.products);
    startScroll();
  });
function renderProducts(arr) {
  [arr, arr].forEach(list => {
    list.forEach(el => {
      const lap = document.createElement("div");
      lap.classList.add("product");
      lap.innerHTML = `
        <img src="${el.thumbnail}" alt="${el.title}" />
        <h4>${el.title}</h4>
        <p>${el.price.current} ${el.price.currency}</p>`;
      laptops.appendChild(lap);
    });
  });
}
function startScroll() {
  cancelAnimationFrame(animId);
  const trackWidth = laptops.scrollWidth / 2;

  function step() {
    position -= speed;
    if (Math.abs(position) >= trackWidth) position = 0;
    laptops.style.transform = `translateX(${position}px)`;
    animId = requestAnimationFrame(step);
  }
  animId = requestAnimationFrame(step);
}
laptops.addEventListener("mouseenter", () => speed = 0);
laptops.addEventListener("mouseleave", () => speed = 1);
window.addEventListener("resize", () => {
  cancelAnimationFrame(animId);
  position = 0;
  startScroll();
});