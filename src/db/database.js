const mongoose = require('mongoose')
function retryConnect(uri, options) {
    console.log('MongoDB connection with retry')
    mongoose.connect(`${uri}?authSource=admin`, options)
}

module.exports = function ({ db, user, pass }) {
    const options = {
        useNewUrlParser: true,
        reconnectTries: 300,
        reconnectInterval: 500,
        connectTimeoutMS: 10000,
    };
    const uri = `mongodb+srv://${user}:${pass}@cluster0.mud17.mongodb.net/${db}?retryWrites=true&w=majority`

    mongoose.connect(uri, options)

    mongoose.connection.on('connected', () => {
        console.log('Conectado com sucesso ao Mongo')
    })

    mongoose.connection.on('error', function (error) {
        console.log('Erro na conexão: ' + error)
        setTimeout(retryConnect, 5000, uri, options);
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