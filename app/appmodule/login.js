var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var sendmail=require('./sendmail.js');

var login = module.exports = {};
const pool = require('../db/dbservicepool.js');
//const pool = require('./dbservicepool.js');


login.getLogin = function getLogin(req, res, done) {
    var _data = req.body; //getUserData(req);
    console.log(_data);
    db.callProcedure("select " + globals.schema("funget_login") + "($1,$2::json);", ['users', _data], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
 
}
login.getusers = function getusers(req, res, done) {
    var _data = req.body; //getUserData(req);
    
    db.callProcedure("select " + globals.schema("funget_users") + "($1,$2::json);", ['login', _data], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

function getUserData(req) {
    var data = req.body;

    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var other = data.otherdetails;
    other.IP = ip;

    data.other = other;
    return data;
}


login.getLogout = function getLogout(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_logout") + "($1,$2::json);", ['logout', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}


login.loginlog = function loginlog(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_userlog") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

login.forgetpassword = function forgetpassword(req, res, done) {
    
    var _data = req.query;
    db.callProcedure("select " + globals.schema("funget_usersdetail") + "($1,$2::json);", ['logout',_data], function(data) {
        var userdata=JSON.stringify(data.rows);
        if(userdata.length>0){
            mailtemplate="<div> Dear "+userdata[0].Name+" ,  <br/>   <br/>   <p> Your old password:</p><b>"+userdata[0].Password+"</b>  <br/><br/> Thanks.  <br/></div> ";
            
            sendmail.sendMail(userdata[0].EmailID,"Forget Password","",mailtemplate, function (data) {

            },"","","");
        }
       
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}


