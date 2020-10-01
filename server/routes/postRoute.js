const PostController = require("../controllers/postController")
const router = require("express").Router()
const { authentication, authorization } = require('../middlewares/authentication-authorization')

//router.use(authentication)
router.get("/", PostController.getAllPost)
router.get("/:id", PostController.getPost)
router.post("/add", PostController.postAdd)
router.put("/edit/:id", PostController.putPost)
router.delete("/delete/:id", PostController.deletePost)

module.exports = router