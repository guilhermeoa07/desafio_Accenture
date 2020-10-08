const express = require('express');
const bodyParser = require('body-parser');
const normalizePort = require('normalize-port');
const config = require('./config')()

console.log('\n\n\n\n', config)

const port = normalizePort(config.port|| 3000);

//database local
require('./db/Database')({ip: config.ip_db, db: config.db, port: config.port_db});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send({
        Version: 1.0,
        Message: "Desafio Accenture"
    });
});

//Routers
require('./routers/user')(app);

app.listen(port, () => {
	console.log('Servidor Online na porta: ' + port);
});

module.exports = app;