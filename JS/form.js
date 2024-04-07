// [ REGISTER / LOGIN ] //
const register = document.querySelector(".register")

const loginLink = document.querySelector(".loginLink")
const registerLink = document.querySelector(".registerLink")

// Passer sur la registration page
registerLink.addEventListener("click", () => {
    register.classList.add("active")
})

// Passer sur la login page (si l'utilisateur est sur la registration page)
loginLink.addEventListener("click", () => {
    register.classList.remove("active")
})

// [ NODEJS ] //
// Register verification
const formulaire = document.getElementById("register")
const email = document.getElementById("email")
const password = document.getElementById("password")

formulaire.addEventListener("submit", async (event) => {
  event.preventDefault()

  const response = await fetch("http://127.0.0.1:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })

  const result = await response.json()

  const token = result.token

  localStorage.setItem("token", token)
})