let firstname = document.querySelector("#firstName")
let lastname = document.querySelector("#lastName")
let age = document.querySelector("#age")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let phone = document.querySelector("#phone")
let Register = document.querySelector("#Register")
let zipcode = document.querySelector("#zipcode")
let avatar = document.querySelector("#avatar")
let gender = document.querySelector("#gender")
let address = document.querySelector("#address")
let main = document.querySelector("#verify")

Register.addEventListener("click", () => {
    let regform = {
        firstName: firstname.value,
        lastName: lastname.value,
        age: age.value,
        email: email.value,
        address: address.value,
        password: password.value,
        phone: phone.value,
        zipcode: zipcode.value,
        avatar: avatar.value,
        gender: gender.value
    }


    fetch("https://api.everrest.educata.dev/auth/sign_up", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( regform )
    })
    .then(Resp => Resp.json())
    .then(data => {
        verify()
        console.log(data)
    })
    
})
function verify () {
    fetch("https://api.everrest.educata.dev/auth/verify_email", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ email: email.value })
    })
    .then(rap => rap.json())
    .then(x => {
        verifypage(x)
        console.log(x)
    })
}
function verifypage (obj) {
    let page = document.createElement("div")
    page.classList.add("page")
    main.appendChild(page)
    if (obj.statusCode === 400) {
    page.innerHTML = `<h2>${obj.error}</h2>`
    page.style.border = "1px solid red"
    setTimeout(() => {
            page.classList.add("hidden")
        }, 2000)
    } 
    else {
    page.innerHTML = "<h2>Please verify your email</h2>"
    page.style.border = "1px solid green"
    setTimeout(() => {
            window.location.href = "../index.html"
        }, 15000)
    }

}
