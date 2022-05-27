const {validationResult} = require('express-validator')
const blogMedel = require('../models/blog')

exports.createBlog= async (req,res,next)=>{
const title = req.body.title;
const description = req.body.description;
const imageUrl = req.body.image



const validationError =   validationResult(req)
if(!validationError.isEmpty()){
res.status(402).json({message:'validationError',
validationMessage:validationError})
return next()
}

//here we check if there is a blog with the same title 
//you provided and if we find one immediatlly we block the process
//beacause two blogs can't have similar title
try {
    const findBlog = await blogMedel.find({title:title})
    if(findBlog.length > 0){
        res.status(402).json({message:'A blog with this title already exist please pick another title'});
        return next()
    }
} catch (error) {
    res.status(502).json({message:'something went went with our sever please come back later',error:error});
}


const newModel = new blogMedel({
title:title,
description:description,
BlogImage:imageUrl
})

try {
const save = await newModel.save()
res.status(202).json({message:'postCreated',data:save}); 
} catch (error) {
    console.log(error);
   res.status(502).json({message:'faild to save the blog please come back later'})
   return next();
}
}


//get blogs 
exports.getBlogs = async (req,res,next)=>{ 
const page = req.query;
const elementParPage = 10

console.log(page, 'pages');

try {
    const documentNumber = await blogMedel.find().countDocuments();
    const fetchDocument =await blogMedel.find().skip((page.page - 1)* elementParPage).limit(elementParPage)
    
    res.status(201)
    .json({message:'data fetched successfully',
     data:fetchDocument,
     totalDocument:documentNumber,
     totalPage:Math.ceil(documentNumber / elementParPage ),
     ElementLenght:fetchDocument.length
    })
} catch (error) {
    
}
}



