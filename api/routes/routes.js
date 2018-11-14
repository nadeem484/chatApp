/**
 * @description maintaining routes
 */

var express= require('express');//requiring express
var router=express.Router();
var app = express();
var users=require('../controller/userController')

var authRoute=require('./authRoute');
router.get('/:id/list', users.memberList);
// var auth=require('../authentication');

router.use('/auth',authRoute);

router.post('/register', users.registration);
router.post('/login',users.login);
app.use('/', router);//using router to route

module.exports=router;

// // ........................................
// var express= require('express');
// var router=express.Router();

// var users=require('../controller/userController')
// var authRoute=require('./authRoute');

// router.post('/register', users.registration);
// router.post('/login',users.login);

// router.use('/auth',authRoute);

// module.exports=router;