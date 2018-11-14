var mongoose = require('mongoose');

 var userSchema = new mongoose.Schema({
    "userName" : String,
    "userPassword": String,
    "mobile" : String,
    "userEmail": String,
    "gender": String
});

module.exports  = mongoose.model('userdb', userSchema);
