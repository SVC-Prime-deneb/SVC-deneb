var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var pg = require('pg');
var selectedYear = '';


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

//  WHAT IS hos? Hospital per location
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

// POST route to get selected year and month on Chart
router.post('/new/locmonthly', function (req, res) {
    selectedYear = String(req.body.selectedYear);
    console.log('selectedYear', selectedYear);
    console.log('typeof selectedyear', typeof(selectedYear));
        
})

router.get('/locmonthly', function (req, res) {
    // check if logged in
    // console.log('in get route hjhjhj');
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            var queryText = 'SELECT l."location_name",ml.* ' +
                'FROM "public"."location" l ' +
                'INNER JOIN "public"."monthly_location" ml ON ml."location_id" = l."location_id" '+
                'WHERE ml."year" = '+ selectedYear +';';
            console.log('queryText', queryText);
            
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
    
});

// router.get('/locmonthly', function (req, res) {
//     // check if logged in
//     if (req.isAuthenticated()) {
//         pool.connect(function (errorConnectingToDb, db, done) {
//             if (errorConnectingToDb) {
//                 console.log('Error connecting', errorConnectingToDb);
//                 res.sendStatus(500);
//             } else {
//                 var queryText = 'SELECT l."location_name",ml.* ' +
//                                 'FROM "public"."location" l ' +
//                                     'INNER JOIN "public"."monthly_location" ml ON ml."location_id" = l."location_id" '
//                                 'WHERE ml."year" = date_part('/'year'/', current_date);';
//                 db.query(queryText, function (errorMakingQuery, result) {
//                     done();
//                     if (errorMakingQuery) {
//                         console.log('Error making query', errorMakingQuery);
//                         res.sendStatus(500);
//                     } else {

//                         res.send(result.rows);
//                     }
//                 }); // END QUERY
//             }
//         });
//     } else {
//         // failure best handled on the server. do redirect here.
//         console.log('not logged in');
//         res.send(false);
//     }
// });


//                      DISPLAY Nurse Reports Table

router.get('/nurse', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = ' SELECT COUNT(n.*), n."nurse_form_location_name" ' +
                ' FROM "public"."nurse_form_data" n ' +
                ' WHERE n."nurse_was_adv_dispatched" = TRUE ' +
                ' GROUP BY n."nurse_form_location_name";';
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

//                     POST New Nurse Report to Table

router.post('/new/nursereport', function (req, res) {
    console.log('post nurse');
    if (req.isAuthenticated()) {
        var nurse = {
            nursing_form_date: req.body.nursing_form_date,
            nurse_was_adv_dispatched: req.body.nurse_was_adv_dispatched,
            nurse_form_location_name: req.body.nurse_form_location_name,
            nurse_form_time: req.body.nurse_form_time
        }
        pool.connect(function (errorConnectingToDB, db, done) {
            if (errorConnectingToDB) {
                console.log('Error connecting to db', errorConnectingToDB);
                res.sendStatus(500);
            } else {
                var queryText = 'INSERT INTO "nurse_form_data" ("nursing_form_date", ' +
                    '"nurse_was_adv_dispatched","nurse_form_location_name",nurse_form_time) ' +
                    ' VALUES($1,$2,$3,$4);'
                db.query(queryText, [nurse.nursing_form_date, nurse.nurse_was_adv_dispatched,
                    nurse.nurse_form_location_name, nurse.nurse_form_time],
                    function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            console.log('Error making query', errorMakingQuery, result)
                            res.sendStatus(500);
                        } else {
                            res.send(result.rows);
                        }
                    })
            }
        });
    } else {
        console.log('not logged in');
        res.send(false);
    }
});

//                      DELETE Nurse Report from Table

router.delete('/del/:id', function (req, res) {
    console.log('del nurse report');
    // check if logged in
    if (req.isAuthenticated()) {
        var id = req.params.id;

        pool.connect(function (errorConnectingToDB, db, done) {
            if (errorConnectingToDB) {
                console.log('Error connecting to db', errorConnectingToDB);
                res.sendStatus(500);
            } else {
                var queryText = 'DELETE FROM "nurse_form_data" WHERE nurse_form_id = $1 ;';
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
