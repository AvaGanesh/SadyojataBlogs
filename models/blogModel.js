const Joi = require('joi')
const mongoose = require('mongoose');


const blogSchema = mongoose.model('blogSchema',new mongoose.Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date ,user:String}],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
 }));

exports.blogSchema = blogSchema;