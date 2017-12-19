var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var pg = require('pg');



//                    GET ROUTES
router.get('/advperloc', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT COUNT(g."location_id"), l."location_name" ' +
                                'FROM "green_form_data" g ' +
                                    'INNER JOIN "location" l ON l."location_id" = g."location_id" ' +
                                'WHERE g."was_advocate_dispatched" = TRUE ' +
                                'GROUP BY l."location_name";';
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
                var queryText = 'SELECT COUNT(m.*), l."location_name" ' +
                'FROM "public"."ma_form_data" m ' +
                    'INNER JOIN "public"."form" f ON f."ma_form_id" = m."ma_id" ' +
                    'INNER JOIN "public"."green_form_data" g ON g."green_form_id" = f."green_form_id" ' +
                    'INNER JOIN "public"."location" l ON l."location_id" = g."location_id" ' +
                'WHERE m."taxi_provided" = TRUE ' +
                'GROUP BY l."location_name";';
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


router.get('/hos', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT * FROM "location" ORDER BY "location_id" ;';
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

router.get('/locmonthly', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT l."location_name",ml.* ' +
                                'FROM "public"."location" l ' +
                                    'INNER JOIN "public"."monthly_location" ml ON ml."location_id" = l."location_id" ' +
                                'WHERE ml."year" = date_part('/'year'/', current_date);';
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
