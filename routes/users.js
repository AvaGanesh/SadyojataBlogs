const {User,validateUser} = require('../models/userModel');
var {errorResponse,successResponse} = require('../models/responseModel');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.use(express.json());
const _= require('lodash');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });



router.post('/',async(req,res) => {
   console.log("Reached /api/data");
   const { error } = validateUser(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   let user = await users.findOne({email:req.body.email});
   if(user) return res.status(400).send('User already exists!!');
   
   user = new User(_.pick(req.body,['name','email','about','password']));
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password,salt);
   await user.save();
   
   res.send(_.pick(user,['_id','name','email']));
});


router.delete("/",async(req,res)=>{
   var query = User
});


router.put('/',async(req,res)=>{
   var query = User.findByIdAndUpdate({
      _id:req.body.id,
      name:req.body.name
   });
   var promise = query.exec((err,docs)=>{
      if(err){
         errorResponse.message = "Error while updating";
         errorResponse.data = err;
         res.send(errorResponse);
      } else {
         successResponse.message = "Succesfully updated post";
         successResponse.data = docs;
         res.send(successResponse);
      }
   });
});


module.exports = router;
