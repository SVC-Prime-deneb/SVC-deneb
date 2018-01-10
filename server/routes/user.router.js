var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var pg = require('pg');

// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username,
            is_admin: req.user.is_admin,
            is_super_admin: req.user.is_super_admin
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
router.get('/logout', function (req, res) {
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
                var queryText = 'SELECT COUNT(*) ' +
                    'FROM "public"."form" f ' +
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
router.get('/newcases', function (req, res) {
    // check if logged in
    // if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
            var queryText = 'SELECT COUNT(g."green_form_id") ' +
            ' FROM "public"."green_form_data" g ' +
            ' WHERE(date_trunc("day", current_date) = date_trunc("day", g."start_time")' + 
            ' OR date_trunc("day", current_date - INTERVAL '/' 1 DAY'/' )' +
            '= date_trunc("day", g."start_time"));' ;
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
    // } else {
    //     // failure best handled on the server. do redirect here.
    //     console.log('not logged in');
    //     res.send(false);
    // }
});

//                    GET ROUTES
router.get('/deadline', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT * ' + //pulls cases with the same date that have ben created within the last 12 hours
                    'FROM "public"."green_form_data" g ' +
                    'WHERE (g."start_time" BETWEEN (current_time - INTERVAL ' / '12 hours' / ') AND current_time ' +
                    'AND g."date" = current_date);'; //start_time will need to be time without time zone
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
