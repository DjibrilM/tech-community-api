const express =  require('express');
const router = express.Router()
const blogControllers = require('../controllers/blogs')
const {body} = require('express-validator');
const isAth = require('../middlewares/is-auth')


// in this route we do some validations the blog
// title should be at least with a length of four characters
// and alphanimeric
// and the descriptions should contain
// more than 10 characters
//and should be also alphanimeric
router.post('/create',
[
body('title','the title should be at least with four caracters')
// .isAlphanumeric()
.isLength({min:4}),
body('description','the description should of 10 characters as the minimum')
// isAlphanumeric()
.isLength({min:10})
],
isAth , blogControllers.createBlog
);


//route for geting blogs
router.get('/fetch',blogControllers.getBlogs);
//get  one single blog
router.get('/singleBlog/:id',blogControllers.getSingleBlog);
//get update blog
router.get('/getUpdate/:id', isAth ,  blogControllers.getupdate)
//post update  blog
router.post('/postUpdate',[
body('title','the title should be at least with four caracters')
    // .isAlphanumeric()
.isLength({min:4}),
body('description','the description should of 10 characters as the minimum')
 // isAlphanumeric()
    .isLength({min:10})
],isAth,blogControllers.postEditBlog);





module.exports = router;
