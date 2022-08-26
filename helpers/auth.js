const usersModel = require('../models/user');

exports.deleteRestToken = async  (email,res)=>{

usersModel.find({email:email})
.then(user=>{
    setTimeout(() => {
        user[0].resetToken = null;
        return user[0].save()
    }, 180000);
})
.then(Result=>{
    console.log('token deleted');
})
.catch(error=>{
    console.log(error)
})

}

