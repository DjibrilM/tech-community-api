const express = require('express');
const {body} = require('express-validator')
const route = express.Router();
const authControllers = require('../controllers/auth')

route.post ('/signup',[
body('firstName', 'invalid first name ',)
.isAlphanumeric()
.trim(),
body('secondName', 'invalid second',),
body('email','invalid email')
.isEmail(),
body('password', 'invalid password ').isLength({min:6})
],authControllers.postSignup)


route.post('/login',[
    body('email','invalid email').isEmail(),
    body('password','invalid password , the password must contain more than five character').isLength({min:5})
],
    authControllers.login)


route.post('/getRest',[
    body('email', 'invalid email !').isEmail(),
    authControllers.GetresetPassword
])


module.exports = route