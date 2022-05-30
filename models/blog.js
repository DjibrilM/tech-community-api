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
created_at    : { type: Date,
required: true,
default: Date.now,
immutable:true
},
updated_at    : { type: Date,
required: true,
default: Date.now,
immutable:true
},


})


module.exports = mongoose.model('blogs',blogSchema);