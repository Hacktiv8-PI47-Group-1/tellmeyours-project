const ApiController = require("../controllers/apiController")
const Controller = require("../controllers/controller") 

const router = require("express").Router()
const postRouter = require("./postRoute")
const userRouter = require("./userRoute ")


router.get("/", (req,res)=>{
    res.send("test")
    // res.status(200).json({"message":"Home"})
})
router.get("/langDetectAPI", ApiController.detectLanguage)


router.post("/login")
router.post("/register")
router.use("/post", postRouter)
router.use("/user", userRouter)
 

module.exports = router