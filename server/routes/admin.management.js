
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var pg = require('pg');


//                      GET ROUTES
router.get('/get', function (req, res) {
  console.log('get dem admins');
  // check if logged in
  if (req.isAuthenticated()) {
  pool.connect(function (errorConnectingToDB, db, done) {
    if (errorConnectingToDB) {
      console.log('Error connecting to db', errorConnectingToDB);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT u."user_id" ' +
                            ',u."username" ' +
                            ',u."is_admin" ' +
                            ',u."is_super_admin" ' +
                      'FROM "users" u ' + 
                      'WHERE is_admin = true ;';  //pulls from user where the user is an admin
      db.query(queryText, function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery, result)
          res.sendStatus(500);
        } else {
          console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
  } else {
    console.log('not logged in');
    res.send(false);
  }
});


//                            UPDATE ROUTES

router.put('/update/:id', function (req, res) {
  console.log('update admin');
  // check if logged in

  if (req.isAuthenticated()) {
  var id = req.params.id;
  var is_super_admin = req.body.is_super_admin
  console.log('here',is_super_admin);
  
  pool.connect(function (errorConnectingToDB, db, done) {
    if (errorConnectingToDB) {
      console.log('Error connecting to db', errorConnectingToDB);
      res.sendStatus(500);
    } else {
      var queryText = 'UPDATE "users" SET is_super_admin = $1 WHERE user_id = $2 ;';  //updates an admin to super admin
      db.query(queryText, [is_super_admin, id], function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery, result)
          res.sendStatus(500);
        } else {
          console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
  } else {
    console.log('not logged in');
    res.send(false);
  }
});

//                      DELETE ROUTES

router.delete('/del/:id', function (req, res) {
  console.log('del admin');
  // check if logged in
  if (req.isAuthenticated()) {
    var id = req.params.id;

    pool.connect(function (errorConnectingToDB, db, done) {
      if (errorConnectingToDB) {
        console.log('Error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
      } else {
        var queryText = 'DELETE FROM "users" WHERE user_id = $1 ;'; //delete from users where the id = the id
        db.query(queryText, [id], function (errorMakingQuery, result) {
          done();
          if (errorMakingQuery) {
            console.log('Error making query', errorMakingQuery, result);
            res.sendStatus(500);
          } else {
            console.log(result.rows);
            res.send(result.rows);
          }
        });
      }
    });
  } else {
    console.log('not logged in');
    res.send(false);
  }
});

module.exports = router;
