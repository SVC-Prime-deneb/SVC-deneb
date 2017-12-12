var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'svc',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};


var pool = new pg.Pool(config);

router.get('/', function (req, res) {
  
});



router.get('/', function(req, res) {  //GET route for advocate retrieval in advocate management
    console.log('get /advocate route');
    // check if logged in
  // if(req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDB, db, done) {
            if (errorConnectingToDB) {
              console.log('Error connecting to db', errorConnectingToDB);
              res.sendStatus(500);
            } else {
              var queryText = 'SELECT * ' +
                                'FROM "public"."advocates" a ' +
                                'ORDER BY a."advocate_last_name" ASC;';
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
   /* } else {
      console.log('not logged in');
      res.send(false);
      }*/
  });



 
router.post('/advocate/add', function(req, res) {  //GET route for advocate retrieval in advocate management
    console.log('POST /advocate/add route');
    var advocateToAdd = req.body;
    // check if logged in
    if(req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDB, db, done) {
            if (errorConnectingToDB) {
              console.log('Error connecting to db', errorConnectingToDB);
              res.sendStatus(500);
            } else {
              var queryText = '';
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

module.exports = router;
