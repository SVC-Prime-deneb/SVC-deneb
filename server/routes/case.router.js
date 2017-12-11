var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


router.get('/form', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database    
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "form" ORDER BY "form_row_id" DESC LIMIT "15" ;';
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

    router.get('/green', function (req, res) {
        // check if logged in
        if (req.isAuthenticated()) {
            // send back user object from database  
            var green = req.body.green_form_id
            pool.connect(function (errorConnectingToDb, db, done) {
                if (errorConnectingToDb) {
                    console.log('Error connecting', errorConnectingToDb);
                    res.sendStatus(500);
                } else {
                    var queryText = 'SELECT*FROM "green_form_data" WHERE "green_form_id" = $1;';
                    db.query(queryText, [green], function (errorMakingQuery, result) {
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

router.get('/demo', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database   
        var demo = req.body.demo_id
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "demographics" WHERE "demo_id" = $1;';
                db.query(queryText, [username], function (errorMakingQuery, result) {
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

router.get('/la', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database
        var la = req.body.la_form_id
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "la_form_data" WHERE "la_form_id" = $1;';
                db.query(queryText, [la], function (errorMakingQuery, result) {
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

router.get('/ma', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database
        var ma = req.body.ma_form_id 
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "ma_form_data" WHERE "ma_form_id" = $1;';
                db.query(queryText, [ma], function (errorMakingQuery, result) {
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

router.get('/referral', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database
        var referral = req.body.referral_form_id
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "referral_form_data" WHERE "referral_form_id" = $1;';
                db.query(queryText, [referral], function (errorMakingQuery, result) {
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

router.get('/release', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database 
        var release = req.body.release_form_id
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "release_form_data" WHERE "release_form_id" = $1;';
                db.query(queryText, [release], function (errorMakingQuery, result) {
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
