const {compare} = require('../helpers/bcrypt')
const {User} = require('../models/index')
const {signToken} = require('../helpers/jwt')

class UserController {
    static register(req,res) {
        let addUser = {
            fullName: req.body.fullName,
            nickName: req.body.nickName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        console.log(addUser)
        User.create(addUser)
        .then(result=> {
            res.status(201).json(result)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }

    static async login(req, res) {
        let input = {
            username: req.body.username,
            password: req.body.password
        }
        try {
            const user = await User.findOne({
                where: {
                    username: input.username
                }
            })
            if(!user) {
                res.status(401).json({
                    name: "Unauthorized",
                    message: "Wrong username/password"
                })
            } else if (!compare(input.password, user.password)) {
                res.status(401).json({
                    name: "Unauthorized",
                    message: "Wrong username/password"
                })
            } else {
                const access_token = signToken(input.username)
                //console.log(input.username)
                res.status(200).json({
                    access_token
                })
            }
        } catch(err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController