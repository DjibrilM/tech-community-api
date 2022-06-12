

//second change then

const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose')
const multer = require('multer')
const app = express()

//body-parser config 
app.use(bodyParser.urlencoded({extended:false})); // app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json());
//body-parser parser configuration end

//images request path 
app.use('/data/images',express.static(path.join('__dirname', 'data/images')))
//

//multer configuration 
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'data/images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  

  app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).array('files',10)
  );



// // cors policy settings
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization ');
next()
})

//importation of all routers
const blogsRouter = require('./routes/blogs')
const authentification = require('./routes/auth')
app.use('/blogs',blogsRouter)
app.use('/authentication',authentification)


// // app listening and mongodb connection
const mongodbUrl = 'mongodb://localhost:27017/tech-community-api';
mongoose.connect(mongodbUrl)
.then(result=>{
    app.listen('3000')
}).catch(err=>{
   console.log(err);
//    res.status(err.statusCode).json({err:error,customerMessage:'something went wrong when connecting to the database'})
})
 
