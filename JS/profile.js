// [ DARKMODE ] //
const darkMode = document.querySelector(".darkMode")
const body = document.querySelector("body")

// La fonction "changeMenuIcon" permet de changer l'icon du darkmode (soleil ou lune)
changeModeIcon = (icon) => {
    icon.classList.toggle("fa-moon")
}

let mode = sessionStorage.getItem("darkMode")

// Les lignes ci-dessous permettent d'initialiser la clé "darkMode" dans le stockage de session
// Si la valeur de la clé "darkMode" est égale à "true", alors il applique le darkmode sinon il laisse la page ne clearmode
if (!sessionStorage.getItem("darkMode")) {
    sessionStorage.setItem("darkMode", "false")
} else 
    if(mode == "true") {
        body.style.background = "rgba(0, 0, 0, 0.9)"
        body.classList.toggle("darkMode")
}

// Les lignes ci-dessous permettent de basculer entre le darkmode et le clearmode
// La ligne sessionStorage.setItem("darkMode", "true") permet de garde la propriété du darkmode lorsque l'utilisateur passe d'une page à une autre
darkMode.addEventListener("click", function() {
    body.classList.toggle("darkMode")
    
    if (body.style.background != "rgba(0, 0, 0, 0.9)") {
        body.style.background = "rgba(0, 0, 0, 0.9)"
        sessionStorage.setItem("darkMode", "true")
    } else {
        body.style.background = "white"
        sessionStorage.setItem("darkMode", "false")
    }
})

// [ NODEJS ] //
// Login verification
const title = document.getElementById("userName")
const useremail = document.getElementById("userEmail")
const userCreate = document.getElementById("userCreate")

const fetchUser = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
        window.location.href = "../HTML/login.html"
        return
    }

    const response = await fetch(`http://127.0.0.1:3000/getMyProfile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

    if (response.status === 401) {
        window.location.href = "../HTML/login.html"
        return
    } else if (response.status === 403) {
        window.location.href = "../HTML/login.html"
        return
    }

    const user = await response.json()

    title.innerHTML = user.user.name
    useremail.innerHTML = user.user.email
    userCreate.innerHTML = user.user.createdAt
}

fetchUser()