const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    firstName:{
        type:String,
        required:true
    },
    secondName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImagePath:{
        required:true,
        type:String
    },
    resetToken:{
    type:String,
    required:false
    },
    email:{
        type:String,
        required:true
    },
})



module.exports = mongoose.model('users',user);