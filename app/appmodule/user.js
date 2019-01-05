var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var user = module.exports = {};
const pool = require('../db/dbservicepool.js');

// add query functions
user.getAllUsers =  function getAllUsers(req, res, next) {
    var _data = req.body; //getUserData(req);
    db.callProcedure("select " + globals.schema("funget_users") + "($1,$2::json);", ['users', _data], function(data) {
      //rs.resp(data.rows); 
      rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
  }
  
user.getSingleUser = function getSingleUser(req, res, next) {
      var UserID = parseInt(req.params.id);
      db.one('select * from User where id = $1', UserID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE User'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}
  
user.createUser = function createUser(req, res, next) {
    var _data = req.body;
    db.callFunction("select " + globals.schema("funsave_user") + "($1::json);", [_data], function(data) {
      console.log(data.rows);
      rs.resp(res, 200, data.rows);
  }, function(err) {
      rs.resp(res, 401, "error : " + err);
  }, 1)
   
}
  
  user.updateUser = function updateUser(req, res, next) {
    db.none('update User set name=$1, surname=$2, dob=$3 where id=$4',
      [req.query.name, req.query.surname, req.query.dob, parseInt(req.params.id)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated User'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  user.deleteUser = function deleteUser(req, res, next) {
    var _data = req.body;
    db.callFunction("select " + globals.schema("funsave_userdel") + "($1::json);", [_data], function(data) {
      console.log(data.rows);
      rs.resp(res, 200, data.rows);
  }, function(err) {
      rs.resp(res, 401, "error : " + err);
  }, 1)
    // db.result('delete from User where id = $1', UserId)
    //   .then(function (result) {
    //     /* jshint ignore:start */
    //     res.status(200)
    //       .json({
    //         status: 'success',
    //         message: `Removed ${result.rowCount} User`
    //       });
    //     /* jshint ignore:end */
    //   })
    //   .catch(function (err) {
    //     return next(err);
    //   });
  }
  
//   module.exports = {
//     getAllUsers: getAllUsers,
//     getSingleUser: getSingleUser,
//     createUser: createUser,
//     updateUser: updateUser,
//     deleteUser: deleteUser
//   };