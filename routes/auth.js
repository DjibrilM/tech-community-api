const express = require('express');
const route = express.Router();
const authControllers = require('../controllers/auth')

route.put ('/signup',authControllers.postSignup)



module.exports = route