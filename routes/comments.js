
const mongoose = require('mongoose');
const {User,isCurrentUser} = require('../models/userModel');
const express = require('express');
const router = express.Router();


const commentSchema = mongoose.model('commentSchema',new mongoose.Schema({
    postId:String,
    user:String,
    body:String,
    date:{type:Date, default: Date.now }
}));

router.post('/',async(req,res) => {
    console.log(req.body);
    let validUser =  isCurrentUser(req.body.user);  
    if(!validUser) return res.status(400).send('Please register to comment on this post');
    console.log("Reached /post/comments");
    console.log(req.body);
    let comment = new commentSchema({
        postId:req.body.postId,
        user:req.body.user,
        body:req.body.body,
    });
    await comment.save();
    res.send("Comment saved successfully");
});


router.delete('/delete',(req,res)=>{
    var query = commentSchema.findOneAndDelete({_id:req.body.commentId});
    var promise = query.exec((err,docs)=>{
        if(err){
            console.log(err);
        } else {
            res.send(docs);
        }
    });
});


router.post('/all',(req,res)=>{
    var query = commentSchema.find({ postId: req.body.postId });
    var promise = query.exec((err,docs)=>{
        if(err) {
            console.log(err);
            res.send("Error");
        } else {
            res.send(docs);
        }
    });
})

router.put('/edit/:id',(req,res)=>{
   commentSchema.findByIdAndUpdate(req.params.id, req.body,(err,docs)=>{
    if(err) 
        console.log(err)
    else
        res.send(docs);
   });
});



module.exports = router;