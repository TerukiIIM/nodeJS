// [SCROLL TO TOP] //
const nav = document.querySelector("nav")
const btn = document.querySelector(".scrollToTop")

window.onscroll = function() {scrollFunction()}

// La fonction "scrollFunction" Verifie si l'utilisateur a assez scroll vers le bas afin :
// d'afficher le bouton "scroll to top" et faire disparaitre la navbar si les conditions sont replies
// d'afficher la navbar et faire disparaitre le bouton "scroll to top" si l'utilisateur revient en haut de la page
scrollFunction = () => {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        btn.style.display = "block"
        nav.style.top = "-100px"
    } else {
        btn.style.display = "none"
        nav.style.top = "0px"
    }
}

// La fonction "topFunction" permet de remonter en haut de la page, celui-ci est activé lorsque l'utilisateur cliquer sur le bouton "scroll to top"
topFunction = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}

// [ MENU HAMBURGER ] //
const menu = document.querySelector(".menu")
const navLinks = document.querySelector(".navLinks")

// La fonction "changeMenuIcon" permet de changer l'icon du menu hamburger (menu hamburger ou croix)
changeMenuIcon = (icon) => {
    icon.classList.toggle("fa-times")
}

// Les lignes ci-dessous permettent d'afficher ou non le menu hamburger
menu.addEventListener("click", () => {
    navLinks.classList.toggle("mobileMenu")
    
    if (body.style.overflow != "hidden") {
        body.style.overflow = "hidden"
    } else {
        body.style.overflow = "visible"
    }
})

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

// [ REGISTER / LOGIN ] //
const openRegister = document.querySelector(".log")

// Afficher la login page
openRegister.addEventListener("click", () => {
    window.location.href = "../HTML/profile.html"
})

// [ TABS ] //
// La fonction "filterizr" permet de gerer un filtre à l'aide de la bibliothèque filterizr

filterizr = () => {
    const lightbox = new SimpleLightbox(".card a")
    const filterizr = new Filterizr(".tabCharacter", { gutterPixels: 50 })
    
    let filterItems = document.querySelectorAll(".filter li")
    filterItems.forEach(function (filterItem) {
        filterItem.addEventListener("click", function () {
          document.querySelector(".filter .active").classList.remove("active")
          filterItem.classList.add("active")
        })
      })
}

// [ HP-API ] //
// Le tableau "characters" contient l'ensemble des noms de personnage
const characters = ["Harry-Potter", "Ron-Weasley", "Draco-Malfoy", "Hermione-Granger", "Minerva-McGonagall", "Severus-Snape", "Albus-Dumbledore", "Lord-Voldemort", "Sirius-Black", "Bellatrix-Lestrange", "Neville-Longbottom", "Cedric-Diggory", "Gregory-Goyle", "Vincent-Crabbe", "Gilderoy-Lockhart", "Luna-Lovegood", "Cho-Chang", "Lucius-Malfoy", "Doloress-Umbridge", "Alastor-Moody", "Nymphadora-Tonks", "Remus-Lupin", "Fred-Weasley", "George-Weasley", "Ginny-Weasley", "Quirinus-Quirrel", "Rubeus-Hagrid", "Peter-Pettigrew", "Viktor-Krum", "Fleur-Delacour"]

// Le dictionnaire "houses" contient la liste des 4 maisons (+ une exeption si le personnage n'a pas de maison) avec un code hex en valeur pour chacune d'entre elle
const houses = {
    "Gryffindor" : "#740001",
    "Slytherin" : "#1a472a",
    "Hufflepuff" : "#f0c75c",
    "Ravenclaw" : "#0e1a40",
    "" : "gray"
}

// La fonction "fetchHarryPotter" permet de fetch les elements de l'api HP-API
fetchHarryPotter = (character) => {
    return fetch("https://hp-api.lainocs.fr/characters/" + character).then(r => r.json())
}

// La fonction "displayHarryPotter" permet d'afficher l'ensemble des personnages dans un element contenant la classe "tabCharacter"
displayHarryPotter = async () => {
    for (i=0; i < characters.length; i++) {
        const data = await fetchHarryPotter(characters[i])

        const role = data.role
        let house = data.house

        // Ces condition permettent définir la catégorie dans laquel va se trouver le "personnage"
        // S'il est le directeur ou un professeur, il sera dans la catégorie "staff" 
        // S'il est un sorcier, il sera dans la catégorie "wizard"
        // S'il est un vilain, il sera dans la catégorie "villain"
        // S'il est un élève d'une des quatres maisons, alors il sera dans la catégorie de la maison associé
        // S'il est un élève mais n'est pas d'une des quatres maisons, alors il sera dans la catégorie "other"
        if (role === "Student") {
            if (house ==  "") {
                house = "Other"
            }
        } else if (role === "Headmaster" || role === "Professor") {
            house = "Staff"
        } else if (role === "Villain") {
            house = "Villain"
        } else {
            house = "Wizard"
        }

        // Afficher le personnage avec son nom, son role, sa maison et son image
        document.querySelector(".tabCharacter").innerHTML += `
        <div class="card filtr-item" data-category="${house}">
            <div class="cardHeader">
                <h3 class="cardTitle">${data.name}</h3>
                <p class="cardChara">${data.role} (${data.house == "" ? "Other" : data.house})</p>
            </div>

            <a href="${data.image}">
                <img src="${data.image}" alt="${data.name}">
            </a>
        </div>
        `
    }
    // faire appel à la fonction "filterizr"
    filterizr()
}

displayHarryPotter()

// La fonction "rollCharacter" renvoie un personnage aléatoire du tableau "characters", avec le nom, une image et une couleur de fond qui correspond au rôle ou à la maison (si le personnage à la rôle "Student") du personnage
rollCharacter = async () => {
    // random revoie un nombre aléatoire entre 1 et la longueur de la liste (en l'occurence : 30)
    const random = Math.floor(Math.random() * characters.length)
    // character renvoie un personnage aléatoire du tableau "characters"
    const character = characters[random]
    const data = await fetchHarryPotter(character)

    const role = data.role
    const house = data.house

    // bgColor est une variable vide
    let bgColor
    
    // La condition ci-dessous permet de definir la couleur du background
    if (role === "Student") {
        bgColor = houses[house]
    } else {
        if (role === "Villain") {
            bgColor = "black"
        } else {
            bgColor = "goldenrod"
        }
    }

    // Changer la couleur du background
    document.getElementById("character").style.backgroundColor = bgColor
    // Afficher le nom et l'image du personnage
    document.getElementById("character").innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.image}" alt="${data.name}">
    `
}