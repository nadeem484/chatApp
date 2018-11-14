var mongoose = require('mongoose');

var chatSchema= new mongoose.Schema ({

    'userid': String,
    'userName':String,
    'message':String,
    'dateTime': String,
   

})

module.exports = mongoose.model('chatData', chatSchema);

