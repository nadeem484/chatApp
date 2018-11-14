var mongoose = require('mongoose');

var personalChatSchema = mongoose.Schema;
var personalChat = new personalChatSchema({

    'senderId': {
        type: String,
        required: true
    },
    'senderName': {
        type: String,
        required: true
    },
    'receiverId': {
        type: String,
        required: true
    },
    'receiverName': {
        type: String,
        required: true
    },
    'message': {
        type: String,
        required: true
    },
    'dateTime': {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('personalChat', personalChat);