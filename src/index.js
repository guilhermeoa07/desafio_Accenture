const express = require('express');
const bodyParser = require('body-parser');
const normalizePort = require('normalize-port');
const config = require('./config')();

const port = normalizePort(config.port || 3000);

//database local
require('./db/database')({
    host: config.host_db,
    db: config.db, 
    port: config.port_db, 
    user: config.mongo_user, 
    pass: config.mongo_pass
});

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

app.use('*', (req, res) => {
    res.status(404).send({Message: 'Non-existent route'});
  })
  
  app.use((error, req, res)=> {
    res.status(400).send({Message: 'Something broke!'});
  })
  

module.exports = app;