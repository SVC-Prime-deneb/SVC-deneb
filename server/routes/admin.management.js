
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var pg = require('pg');


//                      GET ROUTES
router.get('/get', function (req, res) {
  console.log('get dem admins');
  // check if logged in
<<<<<<< HEAD
   if (req.isAuthenticated()) {
    pool.connect(function (errorConnectingToDB, db, done) {
      if (errorConnectingToDB) {
        console.log('Error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
      } else {
        var queryText = 'SELECT * FROM "users" WHERE is_admin = true ;';
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


//                          POST ROUTES
router.post('/new', function (req, res, next) {

  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    is_admin : req.body.is_admin,
    is_super_admin : req.body.is_super_admin
  };
  console.log('new user:', saveUser);

  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Error connecting: ", err);
=======
  if (req.isAuthenticated()) {
  pool.connect(function (errorConnectingToDB, db, done) {
    if (errorConnectingToDB) {
      console.log('Error connecting to db', errorConnectingToDB);
>>>>>>> 23a9a4e282dbfce8cd9b75c4de64378c2cb0c7b0
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "users" WHERE is_admin = true ;';
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


//                          POST ROUTES


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
      var queryText = 'UPDATE "users" SET is_super_admin = $1 WHERE user_id = $2 ;';
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
        var queryText = 'DELETE FROM "users" WHERE user_id = $1 ;';
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
