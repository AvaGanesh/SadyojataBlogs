const Joi = require('joi');
const mongoose = require('mongoose');


const User = mongoose.model('Users',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    about:{
        type:String,
        maxlength:3555
    },
    password:{
        type:String,
        required:true,
        minlength:4
    }
}));

function isCurrentUser(email){
    let validateUser =  User.findOne({email:email});
    return validateUser;
}

function validateUser(user){
    console.log(user);
    const schema = {
        name:Joi.string().max(50).required(),
        email:Joi.string().required().email(),
        about:Joi.string().max(3555),
        password:Joi.string().min(4).required()
    }

    return Joi.validate(user,schema);
}

exports.validateUser = validateUser;
exports.User = User;
exports.isCurrentUser = isCurrentUser;