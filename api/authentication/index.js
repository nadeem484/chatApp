/**
 * 
 */
var jwt = require('jsonwebtoken');
var config = require('../controller/config.json');
const secret = config.secret;

var auth = function(req, res, next){
      
var token=req.headers["token"];
//if(token!=null)
var respo = {
      'message': "Unauthorised Entry "
};
      console.log("in auth ", token);
      jwt.verify(token, secret, function(err, decoded) {
            if(err)
            {
                  console.log(err)
                  return res.status(401).send(respo);
            }
            else{
                  console.log(decoded);
                  next();
            }
           
      });
 
}
module.exports = auth;