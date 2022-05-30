const bcrypt = require('bcrypt');


//this finction does anything For the moment 
exports.postSignup  = (req,res,next)=>{
const fristName = req.body.name;
const secondName = req.body.secondName;
const email = req.body.email;
const userProfileImage = req.files;
const userPassword = req.body.password;


console.log('file', userProfileImage);



}