const usersModel = require('../models/user');

exports.deleteRestToken =  (email)=>{
usersModel.find({email:email})
.then(user=>{
    setTimeout(() => {
        console.log('token reseted')
        user[0].resetToken = 10;
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

