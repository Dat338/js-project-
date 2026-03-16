let infprofile = document.querySelector("#informationprofile");
let inform = JSON.parse(localStorage.getItem("information"));

let obj = ["_id","role","chatIds","avatar","password","cartID","verified","gender"];

let userinformation = document.createElement("div");
userinformation.classList.add("inform");
infprofile.appendChild(userinformation);

for (let key in inform) {

    if (obj.includes(key)) continue;
    let foreveryone = document.createElement("div");
    foreveryone.classList.add("foreveryone");
    let title = document.createElement("h2");
    title.innerText = key;
    let value = document.createElement("p");
    value.innerText = inform[key];
    let input = document.createElement("input");
    input.classList.add("hidden");
    input.value = inform[key];
    let editBtn = document.createElement("button");
    editBtn.innerText = "Change";
    editBtn.classList.add("bluebutton");
    let saveBtn = document.createElement("button");
    saveBtn.innerText = "Save";
    saveBtn.classList.add("bluebutton");
    saveBtn.classList.add("hidden");
    let buttons = document.createElement("div")
    buttons.classList.add("vinme")
    editBtn.addEventListener("click", () => {
        input.classList.toggle("hidden");
        saveBtn.classList.toggle("hidden");
    });
    saveBtn.addEventListener("click", () => {
        let updateData = {};
        updateData[key] = input.value;
        fetch("https://api.everrest.educata.dev/auth/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(updateData)
        })
        .then(res => res.json())
        .then(data => {
            value.innerText = input.value;
            input.classList.add("hidden");
            saveBtn.classList.add("hidden");
        });

    });
    foreveryone.append(title,value,input,buttons);
    buttons.append(editBtn,saveBtn)
    userinformation.appendChild(foreveryone);
}
function passwordchange() {
    let password = document.createElement("div")
    password.classList.add("password")
    infprofile.appendChild(password)
    password.innerHTML = "<h2>Password</h2>"
    let oldpas = document.createElement("input")
    oldpas.placeholder = "Old Password"
    let newpas = document.createElement("input")
    newpas.placeholder = "New Password"
    password.appendChild(oldpas)
    password.appendChild(newpas)
    oldpas.type = "password"
    newpas.type = "password"
    newpas.classList.add("input")
    oldpas.classList.add("input")
    let submit = document.createElement("button")
    submit.classList.add("bluebutton")
    submit.innerText = "Submit"
    password.appendChild(submit)
    submit.addEventListener("click", () => {
        fetch("https://api.everrest.educata.dev/auth/change_password", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                oldPassword: oldpas.value,
                newPassword: newpas.value
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data) 
        })
    })

}
passwordchange()

function photo () {

    let fold = document.createElement("div")
    fold.classList.add("avatarsection")
    infprofile.appendChild(fold)

    let pfp = document.createElement("img")
    pfp.classList.add("pfp")
    fold.appendChild(pfp)

    let Url = document.createElement("input")
    Url.placeholder = "enter url"
    fold.appendChild(Url)


    pfp.src = inform.avatar
    Url.value = inform.avatar

    let btn = document.createElement("button")
    btn.innerText = "Update photo"
    btn.classList.add("bluebutton")
    fold.appendChild(btn)

    btn.addEventListener("click", ()=> {

        fetch("https://api.everrest.educata.dev/auth/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                avatar: Url.value
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            pfp.src = Url.value
        });

    })

}

photo()
