var express= require('express');
var router=express.Router();

var users=require('../controller/userController');
var auth=require('../authentication');
router.post('/savechat',auth,users.chatAddHistory)
//router.post('/savemessage',auth,users.OneToOneChat) //
router.get('/users/:id/userlist',auth, users.memberList);
router.get('/chatlist',auth,users.chatlist);
router.get('/personalChatlist/:receiverid/and/:senderid',auth,users.personalChatlist);


// router.get('/dashboard',auth,users.dashboard);
// router.post('/message/send',auth,users.messageSend);

module.exports = router;

// ............................................................

// var express= require('express');
// var router=express.Router();

// var users=require('../controller/userController');
// var auth=require('../authentication');

// router.get('/users/:id/userlist',auth, users.memberList);
// router.get('/chatlist',auth,users.chatlist);
// router.get('/personalChatlist/:receiverid/and/:senderid',auth,users.personalChatlist);
// // router.post('/message/send',auth,users.messageSend);

// module.exports = router;
