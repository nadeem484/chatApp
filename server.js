/**
 * 
 * @description creating server
 */

// Express framework 
var mongoose = require('mongoose');
var express = require("express");
var socket = require('socket.io');
var app = express()
    // config = require('./config'),
    // mongodb = require('./config/db').connect(config),
var bodyParser = require("body-parser");
var users=require('./api/controller/userController')

var router = require('./api/routes/routes')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
app.use(express.static('./public'));
mongoose.connect('mongodb://localhost:27017/demodb', { useNewUrlParser: true });
app.use('/', router);

var server = app.listen(4100);// starting server in port 4100
console.log("Listening to PORT 4100");



var io = socket(server);

io.on('connection', function(client){


    client.on('disconnect', function(){
        console.log("socket disconnected ")
    })

    client.on('chatRoomBackend', function(data) {
               console.log(data);
               
       users.chatAddHistory(data.userid, data.userName, data.message, data.dateTime);
        
       // console.log(chathistory);
        io.emit('chatroomClient', data);
    })
});
