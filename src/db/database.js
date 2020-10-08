const mongoose = require('mongoose')

module.exports = function ({ip, db, port, user = '', pass = ''}) {

    const url = user !== '' && pass !== ''
        ? `mongodb://${user}:${pass}@${ip}:${port}/${db}`
        : `mongodb://${ip}:${port}/${db}`

    mongoose.connect(url, { useNewUrlParser: true })

    mongoose.connection.on('connected', () => {
        console.log('Conectado com sucesso ao Mongo')
    })

    mongoose.connection.on('error', function (error) {
        console.log('Erro na conexão: ' + error)
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Desconectado.')
    })

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Conexão finalizada pelo terminal.')
            process.exit(0);
        })
    })
}