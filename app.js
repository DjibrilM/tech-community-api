const bodyParser = require('body-parser')
const express = require('express')
const { default: mongoose } = require('mongoose')
const path = require('path')
const app  = express()

//body-parser config
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// cors policy settings
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization ');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

next();
})


//error middleware 
app.use((error,req,res,next)=>{
const errStatus = error.statusCode|| 502;
const errorMesage  = errStatus.message ;
res.status(errStatus).json({message:errorMesage})
})
//importation of all routers
const blogsRouter = require('./routes/blogs')
app.use('/blogs',blogsRouter)



// app listening and mongodb connection
const mongodbUrl = 'mongodb://localhost:27017/tech-community-api';
mongoose.connect(mongodbUrl)
.then(result=>{
    app.listen('8080')
}).catch(err=>{
   console.log(err);
//    res.status(err.statusCode).json({err:error,customerMessage:'something went wrong when connecting to the database'})
})










