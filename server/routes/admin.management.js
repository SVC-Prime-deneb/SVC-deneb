
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
      res.sendStatus(500);
    }
    client.query("INSERT INTO users (username, password, is_admin, is_super_admin) VALUES ($1, $2, $3, $4) RETURNING user_id",
      [saveUser.username, saveUser.password, saveUser.is_admin, saveUser.is_super_admin],
      function (err, result) {
        client.end();

        if (err) {
          console.log("Error inserting data: ", err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
  });

});


//                            UPDATE ROUTES

//TODO add forgot password and finish this route.
router.put('/update/:id', function (req, res) {
  console.log('update admin');
  // check if logged in

  if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_admin = req.body.is_admin;
    var is_super_admin = req.body.is_super_admin
    pool.connect(function (errorConnectingToDB, db, done) {
      if (errorConnectingToDB) {
        console.log('Error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
      } else {
        var queryText = 'UPDATE "users" WHERE user_id = $1 ;';
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
        db.query(queryText,[id] ,function (errorMakingQuery, result) {
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
