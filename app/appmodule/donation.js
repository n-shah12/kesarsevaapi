var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var donation = module.exports = {};
const pool = require('../db/dbservicepool.js');

// add query functions
donation.donate=function donate(req, res, next){
  var _data = req.body; //getUserData(req);

  db.callFunction("select " + globals.schema("funsave_donation") + "($1::json);", [_data], function(data) {
      rs.resp(res, 200, data.rows);
  }, function(err) {
      rs.resp(res, 401, "error : " + err);
  }, 1)
}
donation.getAlldonations =  function getAlldonations(req, res, next) {
    var _data = req.body; //getUserData(req);

    db.callProcedure("select " + globals.schema("funget_donationdetail") + "($1,$2::json);", ['users', _data], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
  }
  
  donation.getSingledonation = function getSingledonation(req, res, next) {
      var UserID = parseInt(req.params.id);
      db.one('select * from donation where id = $1', UserID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE donation'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  donation.createdonation = function createdonation(req, res, next) {
    db.none('insert into donation(name, surname, dob) values (${name}, ${surname}, ${dob})', req.query)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one donation'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  donation.updatedonation = function updatedonation(req, res, next) {
    db.none('update donation set name=$1, surname=$2, dob=$3 where id=$4',
      [req.query.name, req.query.surname, req.query.dob, parseInt(req.params.id)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated donation'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  donation.deletedonation = function deletedonation(req, res, next) {
    var UserId = parseInt(req.params.id);
    db.result('delete from donation where id = $1', UserId)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} donation`
          });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
//   module.exports = {
//     getAllUsers: getAllUsers,
//     getSingleUser: getSingleUser,
//     createUser: createUser,
//     updateUser: updateUser,
//     deleteUser: deleteUser
//   };