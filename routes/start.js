const express = require("express")
const UsersController = require("../controllers/UsersController")
const PostController = require("../controllers/PostController")
const AuthentificationController = require("../controllers/AuthentificationController")
const { authenticateToken } = require("../middlewares/Auth")

const router = express.Router()

// USER
router.get("/users", UsersController.index)
router.post("/users", UsersController.store)
router.get("/users/:id", UsersController.show)
router.put("/users/:id", UsersController.update)
router.delete("/users/:id", UsersController.delete)

// POST
router.get("/post", PostController.index)
router.post("/post", PostController.store)
router.get("/post/:id", PostController.show)
router.put("/post/:id", PostController.update)
router.delete("/post/:id", PostController.delete)

//LOGIN
router.post("/login", AuthentificationController.login)
router.get("/getMyProfile", authenticateToken, AuthentificationController.getMyProfile)

module.exports = router