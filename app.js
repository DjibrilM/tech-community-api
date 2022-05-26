const bodyParser = require('body-parser')
const express = require('express')
const { default: mongoose } = require('mongoose')
const path = require('path')
const app  = express()




app.use(bodyParser.urlencoded({extended:false}));



const mongodbUrl = 'mongodb://localhost:27017/tech-community-api';
mongoose.connect(mongodbUrl)
.then(result=>{
    app.listen('8080')
}).catch(err=>{
   console.log(err);
//    res.status(err.statusCode).json({err:error,customerMessage:'something went wrong when connecting to the database'})
})










