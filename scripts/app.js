let header = document.querySelector("#header")
let accessToken = localStorage.getItem("accessToken")
let profileinfo = document.querySelector("#profileinfo")

let token = localStorage.getItem("accessToken")
if (!token || token === "undefined" || token === "undefined") {
    window.location.href = "../index.html";
}
fetch("https://api.everrest.educata.dev/auth", {
    method : "GET",
    headers : {
        "Authorization": `Bearer ${accessToken}`
    }
})
.then(resp => resp.json())
.then(y => {
    localStorage.setItem("information", JSON.stringify(y))
})
.catch (err => console.log(err))



function user(y) {
    let profile = document.createElement("div")
    profile.classList.add("profile")
    profileinfo.appendChild(profile)
    profile.innerHTML = `<div class="icon" style="background-image: url(${y.avatar});"></div>
    <h3>${y.firstName}</h3>`
    let profilebox = document.createElement("div")
    profilebox.classList.add("listofprofile")
    profile.appendChild(profilebox)
    let logout = document.createElement("button")
    let infoprofile = document.createElement("button")
    logout.classList.add("bluebutton")
    infoprofile.classList.add("bluebutton")
    logout.innerText = "logout"
    infoprofile.innerText = "info"
    profilebox.appendChild(infoprofile)
    profilebox.appendChild(logout)
    profile.addEventListener("click", ()=> {
    profilebox.classList.toggle("hidden")
    profilebox.classList.toggle("something")
    })
    logout.addEventListener("click", ()=> {
        localStorage.clear("accessToken")
        window.location.href = "../index.html"
    })
    infoprofile.addEventListener("click", ()=> {
        window.location.href = "../html/profile.html"
    })
}


