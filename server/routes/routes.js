const router = require('express').Router()
const UserController = require('../controllers/cUser')
const { authentication, authorization } = require('../middlewares/authentication-authorization')

router.post('/register',UserController.register)
router.post('/login', UserController.login)
router.use(authentication)

module.exports = router