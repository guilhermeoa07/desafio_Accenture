const logger = require('pino')()

module.exports = function (type, message) {
    logger.info({
        type, 
        message,
        date: Date.now()
    })
}
