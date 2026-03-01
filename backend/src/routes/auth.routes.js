const express = require("express")
const authController = require("../controllers/auth.controller.js")
const router = express.Router()

//user - register,login
router.post("/user/register",authController.registerUser)
router.post("/user/login",authController.loginUser)
router.get("/user/logout",authController.logout)

module.exports = router