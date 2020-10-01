const {User} = require('../models/index.js')
const {verifyToken} = require('../helpers/jwt.js')

const authentication = (req, res, next) => {
    const decoded = verifyToken('eyJhbGciOiJIUzI1NiJ9.ZW5yaWNvYW50bw.zzyEXYTPizEeS9mqf1XwIND3q7kgtlTLXvaeefiElX8')
    console.log(decoded)
    User.findOne({
        where:{
            username: decoded
        }
    })
    .then(data => {
        if(!data) {
            res.status(404).json({msg : 'Username Not found'})
        } else {
            req.userData = data
            next()
        }
    }) 
    .catch(err=> {
         res.status(500).json({message : err.msg})
    }) 
}

const authorization = (req, res, next) => {
    const id = req.params.id
    console.log(req.params.id)
    const userData = req.userData.id
    //.findByPk(id)
    .then(data => {
        if (!data) {
           // res.status(404).json({msg : 'Data Not Found'})
        } else if (userData !== data.UserId) {
            res.status(403).json({msg : `You don't have access`})
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({message : err.msg})
    })
}
module.exports = {
    authentication,
    authorization
}