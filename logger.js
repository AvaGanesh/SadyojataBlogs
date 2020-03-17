function log(req,res,next){
    console.log('Logging request...');
    console.log(req.body);
    next();
}


module.exports = log;