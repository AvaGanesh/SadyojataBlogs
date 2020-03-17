const mongoose = require('mongoose');
const {User,isCurrentUser} = require('../models/userModel');
const express = require('express');
var { errorResponse,successResponse} = require('../models/responseModel');
const Joi = require('joi');
const router = express.Router();
const likes = express.Router();
const _= require('lodash');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });



const blogSchema = mongoose.model('blogSchema',new mongoose.Schema({
    title:  String, // String is shorthand for {type: String}
    author: String,
    body:   String,
    images: [{
        type: String
    }],
    likes:Number,
    tags:[{
        type:String
    }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
}));



router.post('/add',async(req,res) => {
    console.log("Reached /add/post");
    console.log(req.body);
    let blogPost = new blogSchema({
        title:req.body.title,
        author:req.body.author,
        body:req.body.body,
        hidden:req.body.hidden,
        images:[],
        tags:req.body.tags,
        likes:0,
    });
    await blogPost.save();
    console.log(blogPost);
    successResponse.message = "Post saved successfully";
    successResponse.data = blogPost;
    res.send(successResponse);
});

router.post('/all',(req,res)=>{
    console.log("/post/all");
    var query = blogSchema.find({});
    var promise = query.exec((err,docs)=>{
        if(err) {
            errorResponse.data = err;
            errorResponse.message = "Error while reading data";
            console.log(err);
            res.send(errorResponse);
        } else {
            successResponse.message = "Data retrieved successfully!!";
            successResponse.data = docs;
            res.send(successResponse);
        }
    });
});

router.post('/recent',async(req,res)=>{
    var query = blogSchema.find({}).limit(10);
    var promise = query.exec((err,docs)=>{
        if(err) {
            errorResponse.data = err;
            errorResponse.message = "Error while retrieving recent posts";
            console.log(err);
            res.send("Error");
        } else {
            successResponse.message = "Successfully retrieved recents data";
            successResponse.data = docs;
            res.send(successResponse);
        }
    });
});

router.get('/likes',async(req,res) => {
    console.log("Reached /add/post");
    console.log(req.body);
    blogSchema.update({_id: req.body.id}, {$inc: { $likes: 1}});  
    res.send("Post saved successfully");
});


router.post('/getByTags',async(req,res)=>{
    var query = blogSchema.findOne({tags:req.body.tags});
    var promise = await query.exec((err,docs)=>{
        if(err){
            errorResponse.message = "Error while retriving data by tags";
            errorResponse.data = err;
            res.send(errorResponse);
        } else {
            console.log(docs);
            successResponse.data = docs;
            successResponse.message = "Successfully retrieved data";
            res.send(successResponse);
        }
    });
})

router.put('/edit/:id',(req,res)=>{
    blogSchema.findByIdAndUpdate(req.params.id, req.body,(err,docs)=>{
     if(err) 
         console.log(err)
     else
         res.send(docs);
    });
 });
 

 
router.delete("/delete",async(req,res)=>{
    var query = blogSchema.deleteOne({_id:req.body.id});
    var promise = query.exec((err,docs)=>{
        if(err){
            errorResponse.data = err;
            errorResponse.message = "Error while deleting";
            res.send(errorResponse);
        } else {
            successResponse.message = "Successfully deleted the post";
            successResponse.data = docs;
            res.send(successResponse);
        }
    })
 });
 

module.exports = router;