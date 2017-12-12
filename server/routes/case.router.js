var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');



//                    GET ROUTES
router.get('/form', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "form" ORDER BY "form_row_id" DESC LIMIT 15 ;';
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

router.get('/green/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        var green = req.params.id
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

router.get('/demo/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        var demo = req.params.id
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "demographics" WHERE "demo_id" = $1;';
                db.query(queryText, [demo], function (errorMakingQuery, result) {
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

router.get('/la/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        var la = req.params.id
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

router.get('/ma/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        var ma = req.params.id
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "ma_form_data" WHERE "ma_id" = $1;';
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

router.get('/referral/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        var referral = req.params.id
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

router.get('/release/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        var release = req.params.id
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


//                      POST


//                      PUT 


router.put('/update/green/:id', function (req, res) {
    console.log('update green');
    
    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var green = {
        date: req.body.date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        location_id: req.body.location_id,
        nurse: req.body.nurse,
        contact_phone: req.body.contact_phone,
        was_advocate_dispatched: req.body.was_advocate_dispatched,
        advocate_name_dispatched: req.body.advocate_name_dispatched,
        dispatch_notes: req.body.dispatch_notes,
        is_completed: req.body.is_complete,
        date_completed: req.body.date_completed,
        green_form_notes: req.body.green_form_notes
    }
    console.log('here', req.body);
    pool.connect(function (errorConnectingToDB, db, done) {
        if (errorConnectingToDB) {
            console.log('Error connecting to db', errorConnectingToDB);
            res.sendStatus(500);
        } else {
            var queryText ='UPDATE"green_form_data"SET "date" = $1, "start_time" = $2 , "end_time"= $3, ' +
                '"location_id"=$4, "nurse"=$5, "contact_phone"=$6,"was_advocate_dispatched"=$7, "advocate_name_dispatched"=$8,' +
                '"dispatch_notes"=$9, "is_completed"=$10, "date_completed"=$11, "green_form_notes"=$12 WHERE "green_form_id" = $13;';
            db.query(queryText, [green.date, green.start_time, green.end_time, green.location_id,
                green.nurse, green.contact_phone, green.was_advocate_dispatched, green.advocate_name_dispatched,
                green.dispatch_notes, green.is_completed, green.date_completed, green.green_form_notes, id],
                function (errorMakingQuery, result) {
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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});

router.put('/update/:id', function (req, res) {
    console.log('update admin');
    // check if logged in

    // if (req.isAuthenticated()) {
    var id = req.params.id;
    var is_super_admin = req.headers.is_super_admin
    console.log('here', req.headers.is_super_admin);

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
    // } else {
    //   console.log('not logged in');
    //   res.send(false);
    // }
});







module.exports = router;
