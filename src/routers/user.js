const Router = require('express').Router();
const userControler = require('../controllers/user');

Router.post('/', userControler.post);

Router.post('/authenticate', userControler.postAuthenticate);

module.exports = (app) => app.use('/user', Router);
