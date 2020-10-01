
const UserController = require("../controllers/userController ")
const router = require("express").Router()

router.get("/", (req,res)=>{res.send("test")})

module.exports = router