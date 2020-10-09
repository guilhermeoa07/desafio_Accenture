const Router = require('express').Router();
const userControler = require('../controllers/user');
const auth = require('../middleware/auth');

Router.post('/signup', userControler.post);
Router.post('/signin', userControler.logginUser);
Router.get('/getUser/:id', auth,  userControler.getUser);

module.exports = (app) => app.use('/', Router);
