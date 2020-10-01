const jwt = require('jsonwebtoken');

function signToken(input) {
    return token = jwt.sign(input,'rahasia')
}

function verifyToken(token) {
    return token = jwt.verify(token,'rahasia')
}

module.exports = {
    signToken,
    verifyToken
}