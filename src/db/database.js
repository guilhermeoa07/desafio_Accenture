const mongoose = require('mongoose')

const logger = require('../handlers/logger')

function retryConnect(uri, options) {
    console.log('MongoDB connection with retry')
    mongoose.connect(`${uri}?authSource=admin`, options)
}

module.exports = function ({ host, db, user, pass }) {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        connectTimeoutMS: 10000
    };
    const uri = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`

    mongoose.connect(uri, options)

    mongoose.connection.on('connected', () => {
        logger('Infor', 'Conectado com sucesso ao Mongo')
    })

    mongoose.connection.on('error', function (error) {
       logger('Error', `Erro na conexão: ${error}`)
        setTimeout(retryConnect, 5000, uri, options);
    })

    mongoose.connection.on('disconnected', () => {
       logger('Infor','Desconectado.')
    })

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            logger('Infor','Conexão finalizada pelo terminal.')
            process.exit(0);
        })
    })
}