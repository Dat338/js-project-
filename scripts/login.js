let email = document.querySelector("#email")
let password = document.querySelector("#password")
let button = document.querySelector("#login")
let login = document.querySelector(".login")
let main = document.querySelector(".text")
let appearlogin = document.querySelector("#appearlogin")
let forgot = document.querySelector("#forgotpas")
let text = "Welcome To Everest"
let letters = 0

function appeartext () {
    if (letters < text.length) {
        let place = document.createElement("span")
        place.classList.add("someone")
        place.innerHTML = text[letters]

        main.appendChild(place)

        letters++

        setTimeout(appeartext, 200)
    }
}

appeartext()

setTimeout(() => {
  main.innerHTML = ""
    appearlogin.classList.remove("hidden")
}, 3900)


button.addEventListener("click", () => {
 let login = {
  email: email.value,
  password: password.value
}


fetch("https://api.everrest.educata.dev/auth/sign_in", {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(login)
})
.then(res => res.json())
.then(data => {
    console.log(data);
    if (data.access_token) {
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("user", JSON.stringify(login));
        Swal.fire({
            title: "Welcome!",
            text: "Login successful 🎉",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
        setTimeout(() => {
            window.location.href = "./html/products.html";
        }, 1500);
    } else {
        Swal.fire({
            title: "Login Failed",
            text: "Wrong email or password",
            icon: "error"
        });
    }
})
.catch(err => {
    console.log(err);
    Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error"
    });
});
})



forgot.addEventListener ("click", () => {
    let popup = document.createElement("div")
    popup.classList.add("loginpopup")
    main.appendChild(popup)
    let close = document.createElement("div")
    close.classList.add("close")
    close.innerText = "X"
    close.addEventListener("click", ()=> {
        popup.remove()
    })
    popup.innerHTML = `
        <h2 id="textofpopup">Please enter Email</h2>
        <input type="email" id="Recoveryemail" required >
        <Button class="bluebutton buttonwidth" id="recbutton">Sumbit</Button>`
    popup.appendChild(close)

    let Recoveryemail = document.querySelector("#Recoveryemail")
    let recoverybutton = document.querySelector("#recbutton")
    let textofpopup = document.querySelector("#textofpopup")
    recoverybutton.addEventListener("click", ()=> {
    fetch ("https://api.everrest.educata.dev/auth/recovery", {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({email : Recoveryemail.value})
    })
    .then (resp => resp.json())
    .then (y => {
        console.log(y)
     if (y.status == 200) {
        textofpopup.innerText = "recovery has been sent to email"
     }
     else {
        textofpopup.innerText = "Please use correct email"
     }
    })
    
})
})
