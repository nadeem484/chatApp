var usermod = require('../models/userModel');
var usermode = require('../models/chatSchema')
var personalmod = require('../models/peerschema');
var config = require('./config.json');
const secret = config.secret;

var jwt = require('jsonwebtoken')
// var services = require('../service');
/**
 * 
 * @param {*} 
 * @description encrypt the user input password.
 */

function encrypt(pass) 
{
    var encryPass = require('crypto')
        .createHash('sha1')
        .update(pass)
        .digest('base64');
    return encryPass;
}

// var userMod = require('../models/userModel');
// var jwt = require('jsonwebtoken')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

exports.registration = function (req, res) {
    console.log(req.body);
    
    // return res.status(404).send("resp");
    var response = {};
    var mail = req.body.userEmail;

      //username validation
      if(req.body.userName==null||req.body.userName==undefined||req.body.userName==""||!isNaN(req.userName))
      {
        var response = {"sucess": false, "message": "userName Should only have aphabet"}
        return res.status(404).send(response);
      }
/**
 * @description gender validation.
 */
    // var str = /^male$|^female$|^others$/;
    if (req.body.gender ===null||req.body.gender===undefined||req.body.gender===""||req.body.gender===false)
    {
        var response = 
        {"Success": false, "message": "Gender input is Incorrect.. Please enter male, female or other.."}
        return res.status(404).send(response);
    }

    /**
     * @description password validation
     */
    var str  = /^[[a-zA-Z0-9]{3,14}$/;
    console.log(str.test(req.body.userPassword));
    
    if(str.test(req.body.userPassword) == false|| req.body.userPassword =="")
    {
        var response={
            "sucess":false, 
            "message": "the password must contain at least 4 characters and no more than 15 characters and no characters other than letters"}
        return res.status(404).send(response);
    }

    /**
     * @description mobile number validation
     */
    if(req.body.mobile =="" || req.body.mobile.length!=10 ||isNaN(req.body.mobile)==true)
    {
    var response = {
        "sucess":false, 
        "message":"mobile number should be a 10 digit number"}
        return res.status(404).send(response);
    }

    if(req.body.userEmail === ''||req.body.userEmail===undefined||req.body.userEmail===null)
    {
        var response={
            "sucess":false,
            "message":"email can not be empty"}
            return res.status(404).send(response);
    }
    
    // services.userService.register();

    var db = new usermod();

    db.userEmail = req.body.userEmail;
    /**
     * @description Hash the password using SHA1 algorithm.
     */
    db.userPassword = encrypt(req.body.userPassword);
    db.userName = req.body.userName;
    db.mobile = req.body.mobile;
    db.gender = req.body.gender;
   
    
    

    usermod.find({"userEmail": mail}, function (err, data) {
        if (err)
         {
            response = {"Success": false, "message": "Error fetching data"};
            return res.status(404).send(response);
        }
         else 
         {
            if (data.length > 0) 
            /**
             *@description it check the given email is already registerd
             */
            {
                var response = {
                    "Success": false,
                     "message": "Login credentials already Exist!!",};
                return res.status(404).send(response);
            } 
            else 
            {
                db.save(function (err)
                 {
                    // save() will run insert() command of MongoDB.
                    // it will add new data in collection.
                    if (err)
                    {
                        response = {
                            "Success": false, 
                            "message": "Error adding data", "err": err };
                    } 
                    else 
                    {
                        response = {
                            "Success": true,
                            "message": "Successfully Registed"};
                    }
                    return res.status(200).send(response);
                });
            }
        }
    });
}
            
//logic api controller logic
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.login = function (req, res) 
{
    //   console.log(req.body);
    //   return res.status(404).send("resp");

    var mail = req.body.Email;
    var pass = encrypt(req.body.Password);
    // var pass = req.body.Password
    var response = {};
    console.log(mail);

    /**
     * @description empty input validation
     */
    
    usermod.find({"userEmail": mail, "userPassword": pass}, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err)
         {
            response = {"Success": false,"message": "Error fetching data" };
            return res.status(404).send(response);
        }
         else if (data.length > 0){
              
            var token = jwt.sign({
                "userEmail": mail, 
                "userPassword": pass },
                  secret,{ expiresIn : "30d"});
             
            var userid = data[0]._id;
            // console.log(db._id);
            var response = {
                "Success": true,
                "message": "login sucessful",
                "token": token,
                "userid": userid ,
                "userName":data[0].userName};
              return res.status(200).send(response); 
            }

            else {
                var response = {
                 "Success": false, 
                 "message": "Invalid credentials" };
                return res.status(404).send(response);
            }
        
    });

}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.memberList = function (req, res) {

    var userid = req.params.id;
    
    var response = {};
    var arrList = [];
    var respo = {};
    usermod.find({"_id": {$ne: (userid)}}, function (err, data) 
    {

        if (err) 
        {
            response = {"message": "Error fetching data"}
        }
         else 
        {
            response = {"message": data};
        }
        if(response.message.length)
        for (var i = 0; i < response.message.length; i++) {
            arrList.push({

                username: response.message[i].userName,
                userid: response.message[i]._id
            });
        }
        respo = {"data": arrList}
        return res.status(200).send(respo);
    });

}

/**
 * @description chathistaory function
 */
 
exports.chatAddHistory = function (userid, userName, message, dateTime) {

    var response = {};
    var db = new usermode();

    db.userid = userid;
    db.message = message;
    db.dateTime = dateTime;
    db.userName = userName


    db.save(function (err) {

        if (err) {

            response = {
                'Success': "false",
                'message': "Error in Data Fetching"
            }
        } else {

            response = {

                'Success': "true",
                'message': "Message Data successfully Saved into DataBase "
            }
        };
        console.log(response);
    })

}

/**
 * @description chatlist function
 */

exports.chatlist = function (req, res) {
    var respo = {};
    usermode.find({}, function (err, data){
        if (err) {
            respo = {
                'Success': "false",
                'message': "Error in fetching data "
            }
            return res.status(401).send(respo);

        } else {
            respo = {
                'Success': 'true',
                'message': data
            }
            return res.status(200).send(respo);

        }
    });
}

/**
 * @description peer to peer function
 */

exports.personalMessgAdd = function(senderId, senderName, receiverId, receiverName, message, dateTime){


    var db = new personalmod();

    // receiverid = receiverId;
    // senderid = senderId;

    db.senderId = senderId;
    db.senderName = senderName;
    db.receiverId = receiverId;
    db.receiverName = receiverName;
    db.message = message;
    db.dateTime = dateTime;

    db.save(function(err){


        if (err) {

            response = {
                'Success': "false",
                'message': "Error in Data Fetching"
            }
        } else {

            response = {

                'Success': "true",
                'message': "Message Data successfully Saved into DataBase "
            }
        };
        console.log(response);

    })
}

exports.personalChatlist = function (req, res) {

    var respo = {};

    var receiverid = req.params.receiverid;
    var senderid = req.params.senderid; 

    personalmod.find({$or:[{'receiverId': receiverid, 'senderId': senderid},{'receiverId': senderid, 'senderId': receiverid}]}, function (err, data) {

        if (err) {

            respo = {
                'Success': "false",
                'message': "Error in fetching data "
            }
        } else {
            respo = {
                'Success': 'true',
                'message': data
            }
        }

       // console.log(respo)
        return res.status(200).send(respo);
    });
}