
const PostController = require("../controllers/postController")
const router = require("express").Router()

router.get("/", PostController.getAllPost)

module.exports = router