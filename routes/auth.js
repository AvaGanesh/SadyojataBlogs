const {User,validateUser} = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const _= require('lodash');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.post('/',async(req,res) => {
    console.log("Reached /user/login");
    console.log(req.body);
    const { error } = validateUserLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);
 
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) res.status(400).send('Invalid email or password');
    

    const token = jwt.sign({ _id:user._id},'sadyojataBlogs');
    res.header('x-auth-token',token).send('Login successfull!!');
 });
 
function validateUserLogin(user){
    const schema = {
        email:Joi.string().required().email(),
        password:Joi.string().min(4).required()
    }

    return Joi.validate(user,schema);
}
 
module.exports = router;


