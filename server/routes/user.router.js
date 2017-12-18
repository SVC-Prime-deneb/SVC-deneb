var express = require('express');
var router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});


//                    GET ROUTES
router.get('/open', function (req, res) {
  // check if logged in
  if (req.isAuthenticated()) {
      pool.connect(function (errorConnectingToDb, db, done) {
          if (errorConnectingToDb) {
              console.log('Error connecting', errorConnectingToDb);
              res.sendStatus(500);
          } else {
              var queryText = 'SELECT COUNT(*)' +   //counter for the "open" cases
              'FROM "public"."form" f' +
              'WHERE f."is_case_complete" = FALSE;'; //cases are closed based on this boolean val. 
              db.query(queryText, function (errorMakingQuery, result) {
                  done();
                  if (errorMakingQuery) {
                      console.log('Error making query', errorMakingQuery);
                      res.sendStatus(500);
                  } else {
                      res.send(result.rows);
                  }
              }); // END QUERY
          }
      });
  } else {
      // failure best handled on the server. do redirect here.
      console.log('not logged in');
      res.send(false);
  }
});



//                    GET ROUTES
router.get('/taxi', function (req, res) {
  // check if logged in
  if (req.isAuthenticated()) {
      pool.connect(function (errorConnectingToDb, db, done) {
          if (errorConnectingToDb) {
              console.log('Error connecting', errorConnectingToDb);
              res.sendStatus(500);
          } else {
              var queryText = 'SELECT COUNT(*) ' +
              'FROM "public"."ma_form_data" m ' +
              'WHERE m."taxi_provided" = TRUE;';
              db.query(queryText, function (errorMakingQuery, result) {
                  done();
                  if (errorMakingQuery) {
                      console.log('Error making query', errorMakingQuery);
                      res.sendStatus(500);
                  } else {
                      res.send(result.rows);
                  }
              }); // END QUERY
          }
      });
  } else {
      // failure best handled on the server. do redirect here.
      console.log('not logged in');
      res.send(false);
  }
});

module.exports = router;
