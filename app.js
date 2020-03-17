  var express = require('express');
  var app = express();


  var user = require('./routes/users');
  var login = require('./routes/auth');
  var comments = require('./routes/comments');
  var posts = require('./routes/posts');
  var fs = require('fs');

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var multer = require('multer');


  var bodyParser = require('body-parser');
  const _= require('lodash');
  var morgan = require('morgan');
  const bcrypt = require('bcrypt');
  var bodyParser = require('body-parser');
  const {User,validateUser} = require('./models/userModel');


  app.use(morgan('combined'))
  app.use(express.json())

  app.use('/add/user',user);
  app.use('/user/login',login);
  app.use('/posts',posts);
  app.use('/comments',comments);


  var urlencodedParser = bodyParser.urlencoded({ extended: false });
  var bodyParser = require('body-parser');

  //db setup
  var mongoose = require('mongoose');
  var mongoDB = 'mongodb://127.0.0.1/my_database';
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

  //db connection
  var db = mongoose.connection;
  db.then(()=>console.log('Connected to Database...'));
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));


  //version
  app.get('/about',(req,res)=>{
    res.send('Version 1.00');
  });


  app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
  });


  // var item = mongoose.model('imageSchema',new mongoose.Schema({
  //      data: Buffer, contentType: String 
  // }));


  // var Item = mongoose.model('Clothes',item);


  // app.post('/api/photo',function(req,res){
  //   var newItem = new Item();
  //   newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
  //   newItem.img.contentType = 'image/png';
  //   newItem.save();
  //  });



  /*
    /add/user --> post
    /user/login --> post
    
    Posts
    
    /posts/add --> post
    /posts/all --> post
    /posts/delete --> delete
    /posts/getByTags --> post
    /posts/edit/:id --> put

    Comments
    /comments/all --> post
    /comments/delete --> delete
    /comments/    --> post
    /comments/edit/:id --> put 

  sudo service mongod start
  sudo service mongod status
  mongo

  */