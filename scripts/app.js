let header = document.querySelector("#header")

let token = localStorage.getItem("accessToken")
if (!token || token === "undefined" || token === "undefined") {
    window.location.href = "../index.html";
}
if (token == null) {
    if (!token || token === "undefined" || token === "undefined") {
    window.location.href = "../index.html";
}
}

function user() {
    let profile = document.createElement("div")
    profile.classList.add("profile")
    header.appendChild(profile)
    profile.innerHTML = `<i class="fa-solid fa-circle-user" style="font-size: 35px;"></i>`
}
user()