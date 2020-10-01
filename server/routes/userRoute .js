
const UserController = require("../controllers/userController")
const router = require("express").Router()

router.get("/", (req,res)=>{res.send("test")})

router.post('/register',UserController.register)
router.post('/login', UserController.login)


module.exports = router