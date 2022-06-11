## <u>BLOG REST API documentation  </u>

The following documentation is about a blog application using node.js 
and express , this documentation will explain you how you can adapt it 
with the frontend and it will help you to do some update , and if 

points which need update or you want to add some new features please go ahead and implement them 



###  <u>This REST API uses the following technologies</u>
1. ####  express.js 
3. ####  mongoose 
4. ####  multer 
5. ####  body-parser
6. ####  bcrypt
7. ####  express-validatior
8. ####  nodemailer
9. ####  nodemailer-sendgrid-transport
10. #### jsonwebtoken



## POST REQUESTS 
#### 1.Authentication post request
This is the structure of how the post authentication  request should look like miss one of these properies will lead to a response error make sure that you respect all requirements 

* #### signup

```
POST:
 http://localhost:3000/authentication/signup
```

```javascript
   {
       firstName:'first name of the user',
       second Name:'second name  of the user',
       email:'email of the user',
       password:'first nname of the user',
       password:'this is about the user password ' //the password should contain more than 5 characaters  as wise you will receive a validation error  
       files:'this will be the user profie image' //Don't try to write files in singular  and the should provide this image beacause it is a must.
    }
```

* #### signin
```
POST:
http://localhost:3000/authentication/signin
```
```javascript

    
    //in this side more datas are no required  the API just need the user email and password 
   {
    email:'user email'
    password:'user password'
   }
```

* #### reset password  part one 
For the reset password things may seem to be different as you know , the reset password process is split into to part  
the part one consist of sending the email so that we konw wich user is tryng  to reset the password then the API send  an email  message wich contain the link to the reset password  page 

```
POST:
http://localhost:3000/authentication/getRest
```

```javascript


   {
    email:'user email'
   }

```


* #### reset password  part two 
After receving the link and click to it the user will be redirected to a page where he will enter the new password, one thing that you should notice is that the rest password link expires after  5 minutes . 
and if the user  hit the link after those 5 minutes reseting the password will not work anymore and he will need to generate a new link 

```
POST:
http://localhost:3000/authentication/resetPassword

```
```javascript
   {
    password:'new password'
   }

```


#### 2.blogs  post request
This side shows how creating blogs or updating them should be implemented , and some request are avalaible only for the person who created the blog

* #### post a blog 
for posting  blogs  will need to be  aunthenticatd other wise it will not work even if the frontend doesn't provide that mechanism. 

And if you wonder about how to indentifier the creator of the blog , so for every blog creation the backend attach the ID of the registered user  to the to be created blog 
```
POST:
http://localhost:3000/blogs/create
```
```javascript


{
    title:"this will be the title of the blog ",// the title must have more that four characters.
    description:"this is the content of the blog or in  other word the body of the blog" //the description must have more than 10 characters 
    files:"this will be the image of the blog"
}
```

* #### update 
```
POST:
// http://localhost:3000/blogs/postUpdate
```
``` javascript


{
    title:"this will be the title of the blog ",
    description:"this is the content of the blog or in other word the body of the blog"
    files:"this will be the image of the blog " //this field is not required if the user doesn't provide the imge the old image will be used 
}
```
* #### delete

this field is about deleting a blog and only the creator of a blog can delete it 

```
DELETE:
http://localhost:3000/blogs/delete
```
```javascript

{
id:'this filed must contain the blog ID'
}
```


## GET REQUESTS 
This section helps you to understand how get request must be done and which data should you attach beacuse some data require some data to be achieve for example load a single blog , for loading a single blog you must provide the blog ID, requsts that need some datas are a lot and that is for good reason .

* #### Get the public user profile 

this part consist of loading the user profile data the following data maybe used when  when readers want to know more about the person who created the blog 
```
GET:
 http://localhost:3000/authentication/pulicProfile/:user id 
```
* #### Get the private user profile
this section is when the user want to view his profile 
```
GET:
 http://localhost:3000/authentication/privateProfile
``` 

## Get blogs 
for geting blogs you must have an idea about pagination or infinte scrolling, the following links leads videos that will explain you maore about pagination and infinite scrolling 
[Infite scroll](https://www.youtube.com/watch?v=xHm6AbNwAw8&t=764s)
[Pagination](https://www.youtube.com/watch?v=IqYiVHrO2U8)
```
GET:
 http://localhost:3000/blogs/fetch/?page=1
 /?page=1 the last pat can be any number and it depend on the page if you are using pagination  and if you are using infinite scroll it will depend on how user scroll and the logic you implemented 
```
## Get a single blog 
For geting a  sinlge blog you must provide the blog ID as the link parameter 
```
GET:
 http://localhost:3000/blogs/singleBlog/:id

```
## GET update 
For geting  the blog that the user want to update the user must be the creator of that blog and the blog ID must be inserted in the link as a paramater 
```
GET:
 http://localhost:3000/blogs/getUpdate/:id
```

---
## AUTHENTICATION 
after talking a lot about request let talk about authentication ,  authentication is a crucial part of all application and something we must take serious , the authentication of this API is implemented with JWT  or jason web token and if you want to dive deep with JWT there is a bunch of articles about that.

The first stage of authentication consist of generating a token or an authentication token brief whatever you call it,  then you store it in the browser using the browser storage of your choice but the local storage is highly interdit for users's security , the token sent by the server expires after 3 hours it means  you will have to logged out the user all the three hours there are many ways for preventing that to happen by using refresh token but our sever doesn't support refresh token yet , we are working on that. You maybe asking yourself  about how to send the token to server so if you did work or performed authentications tasks you maybe aware of the Authorization field in all request both POST an GET.

This is how it look like 

```
fetch(end point url,{
method:'your request method '
headers: {
    'Authorization': 'Bearer' 'token sent by the server '
  },
})
```

> in all request you must attach the Authorization header in all requests you send this is a must!

## Database setup 

> By default this application is connected to a local data base of the person who created this API but if you are runing  this API in your machine you can setup that to your need locally or using mongodb atlas 

