const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  slug = require('mongoose-slug-generator');

const blogSchema = new Schema({
title:{
type:String,
required:true
},
slug: { type: String, slug: "title" },
description:{
type:String,
required:true
},
BlogImage:{
type:String,
required:true
},
creator:{
    type:Schema.Types.ObjectId,
    ref:'users',
    required:true
}
},
{
timestamps:true,
}
)


module.exports = mongoose.model('blogs',blogSchema);