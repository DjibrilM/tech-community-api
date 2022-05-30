const bcrypt = require('bcrypt');
const {validationResult}=  require('express-validator')
const userModel = require('../models/user');


/* the following function trigger the the user signed up.
for signed up user should provide the password 
first name  second name and email.

for the password the password will be crypted so that even 
the administrator will not be able to login with clients accounts

and after singed up the front end receive  the 
JWT token for login which expies after 5hours 
and that is why we also provide the a refersh token 

NB:JWT is not yet introduced it will be introduced  
*/
exports.postSignup  = async (req,res,next)=>{
const firstName = req.body.firstName;
const secondName = req.body.secondName;
const email = req.body.email;
const userProfileImage = req.files;
const password = req.body.password;
console.log(userProfileImage[0].path);


 validationErrror = validationResult(req)


  if(!validationErrror.isEmpty()){
  res.status(400).json({message:'validation faild check your input ',
  error:validationErrror.array()})
  return next();
  }


  try {
      const findExistingUser = await userModel.find({email:email});
      if(findExistingUser[0]){
      res.status(400).json({message:'the following email already exist.'})
      return next()
      }
  } catch (error) {
      res.status(500).json({message:"something went wrong with our system, please come back later."})
  }
 

 try {
     const cryptPassword = await bcrypt.hash(password,12);
     const userData = new userModel({
        firstName:firstName,
        secondName:secondName,
        email:email,
        password:cryptPassword,
        profileImagePath:userProfileImage[0].path
     })
    
     const save = await userData.save();

     res.status(202).json({message:'you have been successfully signed up.',data:save})
 } catch (error) {
     console.log(error)
     res.status(500).json({message:'something went wrong with our system.'})
 }

}



exports.login = async (req,res,next)=>{
const email = req.body.email;
const password = req.body.password;


validationErrror = validationResult(req)

// console.log(validationErrror.array())
// console.log(validationErrror.isEmpty())
 if(!validationErrror.isEmpty()){
 res.status(400).json({message:'validation faild check your input',
 error:validationErrror.array()})
 return next();
 }

try {
    const user = await userModel.find({email:email})
    if(!user[0]){
        res.status(404).json({message:'No existing user  with This email. '})
        return next()
    }

    const ValidateTheThePassword = await bcrypt.compare(password , user[0].password);
    //password verfication 
    if(!ValidateTheThePassword){
        res.status(400).json({message:'invalid password ',})
        return next();
    }

    res.status(202).json({message:'you have successfully login',data:user})
} catch (error) {
    console.log(error)
    res.status(500).json({message:'something went wrong with our system please come back later.'})
}

}