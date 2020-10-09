const jwt = require('jsonwebtoken');
const config = require('../config')()

function generateToken(params = {}) {
    return jwt.sign(params, config.secret, {
        expiresIn: 1800000 //30 minutos
    });
}

module.exports = { generateToken }