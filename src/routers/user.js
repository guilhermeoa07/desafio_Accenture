const Router = require('express').Router();
const userControler = require('../controllers/user');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate')

Router.post('/signup', validate,  userControler.post);
Router.post('/signin', validate, userControler.logginUser);
Router.get('/getUser/:id', auth,  userControler.getUser);

module.exports = (app) => app.use('/', Router);
