let text = "Welcome to Everest";
let welcome = document.querySelector("#text");
let letters = 0;
let mainpage = document.querySelector("main")



function texts() {
  if (letters < text.length) {
    let style = document.createElement("div")
    style.classList.add("h1")
    style.innerHTML = text[letters]
    welcome.appendChild(style)
    letters++;
    setTimeout(texts, 100); 


  }
}
texts(); 
setTimeout(() => {
  welcome.innerHTML = ""; 
}, 2500);

setTimeout(() => {
    let main = document.createElement("div")
    main.classList.add("mainbox")
    main.innerHTML = `<h2>Welcome to Everest</h2>
    <div class="register">
        <button class="buttons"><a href="./html/Register.html">Register</a></button>
    </div>
    <div class="login">
        <button class="buttons"><a href="./html/login.html">Login</a></button>
    </div>`
    mainpage.appendChild(main)
}, 2600);