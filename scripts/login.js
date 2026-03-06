let email = document.querySelector("#email")
let password = document.querySelector("#password")
let button = document.querySelector("#login")



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
    localStorage.setItem("Token", data.access_token)
    console.log(data)
})
})
