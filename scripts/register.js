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
        window.location.href = "../html/login.html"
    })
    
})

