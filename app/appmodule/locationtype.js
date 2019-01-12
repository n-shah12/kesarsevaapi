var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var locationtype = module.exports = {};
const pool = require('../db/dbservicepool.js');

// add query functions
locationtype.getAllLocationTypes =  function getAllLocationTypes(req, res, next) {
    var _data = req.body; //getUserData(req);

    db.callProcedure("select " + globals.schema("funget_locationtype") + "($1,$2::json);", ['users', _data], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
  }
  
  locationtype.getSinglelocationtype = function getSinglelocationtype(req, res, next) {
      var UserID = parseInt(req.params.id);
      db.one('select * from LocationTypeMaster where LocTypeID = $1', UserID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE LocationType'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  locationtype.createlocationtype = function createlocationtype(req, res, next) {
    var _data = req.body;
    db.callFunction("select " + globals.schema("funsave_locationtype") + "($1::json);", [_data], function(data) {
      rs.resp(res, 200, data.rows[0].funsave_locationtype);
      //rs.resp(res, 200, data.rows);
  }, function(err) {
      rs.resp(res, 401, "error : " + err);
  }, 1)
   
  }
  
  locationtype.updatelocationtype = function updatelocationtype(req, res, next) {
    db.none('update LocationTypeMaster set LocType=$1, LocTypeDesc=$2, IsActive=$3 where LocTypeID=$4',
      [req.data.locationType, req.data.locationTypeDesc, req.data.isActive, parseInt(req.data.locTypeID)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated LocationTypeMaster'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  locationtype.deletelocationtype = function deletelocationtype(req, res, next) {
    var UserId = parseInt(req.params.id);
    db.result('delete from LocationTypeMaster where LocTypeID = $1', UserId)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} LocationTypeMaster`
          });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
  }
