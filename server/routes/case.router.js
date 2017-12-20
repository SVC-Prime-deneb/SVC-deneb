var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var moment = require('moment');


//                    GET ROUTES
router.get('/form', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "form" ORDER BY "form_row_id" DESC LIMIT 15 ;';
                db.query(queryText, function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                    } else {

                        res.send(result.rows);
                    }
                }); // END QUERY
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
    }
});

router.get('/green/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        var green = req.params.id
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "green_form_data" WHERE "green_form_id" = $1;';
                db.query(queryText, [green], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                    } else {

                        res.send(result.rows);
                    }
                }); // END QUERY
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
    }
});

router.get('/la/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        var la = req.params.id
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "la_form_data" WHERE "la_form_id" = $1;';
                db.query(queryText, [la], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                }); // END QUERY
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
    }
});

router.get('/ma/:id', function (req, res) {
    // check if logged in

    if (req.isAuthenticated()) {
        var ma = req.params.id;

        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "ma_form_data" WHERE "ma_id" = $1;';
                db.query(queryText, [ma], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                    } else {

                        res.send(result.rows);
                    }
                }); // END QUERY
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
    }
});

router.get('/referral/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        var referral = req.params.id
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "referral_form_data" WHERE "referral_form_id" = $1;';
                db.query(queryText, [referral], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                }); // END QUERY
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
    }
});

router.get('/release/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        var release = req.params.id
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT*FROM "release_form_data" WHERE "release_form_id" = $1;';
                db.query(queryText, [release], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                }); // END QUERY
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
    }
});


//                      POST
router.post('/new/green', function (req, res) {
    if (req.isAuthenticated()) {
        var green = {
            date: req.body.date,
            start_time: req.body.start_time,
            location_id: req.body.location.location_id,
            nurse: req.body.nurse,
            was_advocate_dispatched: req.body.was_advocate_dispatched,
            advocate_name_dispatched: req.body.advocate_name_dispatched,
            green_form_notes: req.body.green_form_notes
        }

        pool.connect(function (errorConnectingToDB, db, done) {
            if (errorConnectingToDB) {
                res.sendStatus(500);
            } else {
                var queryText = 'INSERT INTO "green_form_data" ("date","start_time",' +
                    '"location_id","nurse",' +
                    '"was_advocate_dispatched", green_form_notes) VALUES($1,$2,$3,$4,$5,$6) RETURNING "green_form_id";'
                db.query(queryText, [green.date, green.start_time, green.location_id,
                green.nurse, green.was_advocate_dispatched, green.green_form_notes],
                    function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            res.sendStatus(500);
                        } else {
                            res.send(result.rows);
                        }
                    })
            }
        });
//         console.log(green.date);
//         var year = green.date.slice(0,3)
//         var month = green.date.slice(5,7)
//     console.log('month',month);
//     console.log('year', year);
    
//         pool.connect(function (errorConnectingToDB, db, done) {
//             if (errorConnectingToDB) {
//                 res.sendStatus(500);
//             } else {
//                 var queryText = 'UPDATE "monthly_location" SET ' + '"' + month + '"' + '+ 1  WHERE year = ' + '"' + year + '"' + ' AND location_id = $1;'
//                 db.query(queryText, [green.location_id],
//                     function (errorMakingQuery, result) {
//                         done();
//                         if (errorMakingQuery) {
//                             res.sendStatus(500);
//                         } else {
//                             res.send(result.rows);
//                         }
//                     });
//             }
//         });

//     } else {
//         res.send(false);
    }  
});

router.post('/new/table/:id', function (req, res) {
    var id = req.params.id

    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            res.sendStatus(500);
        } else {
            var queryText = 'SELECT form_creation($1);';
            db.query(queryText, [id], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    });
});//End POST route

//                      PUT 

router.put('/update/checkbox/:id', function (req, res) {
    // check if logged in

    if (req.isAuthenticated()) {
        var id = req.params.id;
        var form = {
            formName: req.body.formName,
            formValue: req.body.formValue,
        }

        let queryText = ""
        if (form.formName === "is_ys_complete") {
            queryText = 'UPDATE "form" SET is_ys_complete = $1 WHERE "form_row_id" = $2 ;';
        }
        else if (form.formName === "is_ma_complete") {
            queryText = 'UPDATE "form" SET "is_ma_complete" = $1 WHERE "form_row_id" = $2 ;';
        }
        else if (form.formName === "is_bor_complete") {
            queryText = 'UPDATE "form" SET "is_bor_complete" = $1 WHERE "form_row_id" = $2 ;';
        }
        else if (form.formName === "is_la_complete") {
            queryText = 'UPDATE "form" SET "is_la_complete" = $1 WHERE "form_row_id" = $2 ;';
        }
        else if (form.formName === "is_release_complete") {
            queryText = 'UPDATE "form" SET "is_release_complete" = $1 WHERE "form_row_id" = $2 ;';
        }
        else if (form.formName === "is_referral_complete") {
            queryText = 'UPDATE "form" SET "is_referral_complete" = $1 WHERE "form_row_id" = $2 ;';
        }
        else if (form.formName === "is_demo_complete") {
            queryText = 'UPDATE "form" SET "is_demo_complete" = $1 WHERE "form_row_id" = $2 ;';
        }
        else if (form.formName === "is_ps_complete") {
            queryText = 'UPDATE "form" SET "is_ps_complete" = $1 WHERE "form_row_id" = $2 ;';
        }
        else if (form.formName === "is_case_complete") {
            queryText = 'UPDATE "form" SET "is_case_complete" = $1 WHERE "form_row_id" = $2 ;';
        }
        pool.connect(function (errorConnectingToDB, db, done) {
            if (errorConnectingToDB) {
                res.sendStatus(500);
            } else {
                db.query(queryText, [form.formValue, id], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
            }
        });
    } else {
        res.send(false);
    }
});


router.put('/update/green/:id', function (req, res) {

    if (req.isAuthenticated()) {
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
        pool.connect(function (errorConnectingToDB, db, done) {
            if (errorConnectingToDB) {
                res.sendStatus(500);
            } else {
                var queryText = 'UPDATE"green_form_data"SET "date" = $1, "start_time" = $2 , "end_time"= $3, ' +
                    '"location_id"=$4, "nurse"=$5, "contact_phone"=$6,"was_advocate_dispatched"=$7, "advocate_name_dispatched"=$8,' +
                    '"dispatch_notes"=$9, "is_completed"=$10, "date_completed"=$11, "green_form_notes"=$12 WHERE "green_form_id" = $13;';
                db.query(queryText, [green.date, green.start_time, green.end_time, green.location_id,
                green.nurse, green.contact_phone, green.was_advocate_dispatched, green.advocate_name_dispatched,
                green.dispatch_notes, green.is_completed, green.date_completed, green.green_form_notes, id],
                    function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            res.sendStatus(500);
                        } else {

                            res.send(result.rows);
                        }
                    });
            }
        });
    } else {
        res.send(false);
    }
});

router.put('/update/ma/:id', function (req, res) {

    if (req.isAuthenticated()) {
        var id = req.params.id;

        var ma = {
            advocate_name: req.body.advocate_name,
            advocate_name_additional: req.body.advocate_name_additional,
            location_name: req.body.location_name,
            was_adult_sexual_assault: req.body.victimization.was_adult_sexual_assault,
            was_sexual_exploitation: req.body.victimization.was_sexual_exploitation,
            was_minor_family: req.body.victimization.was_minor_family,
            was_minor_other: req.body.victimization.was_minor_other,
            was_other: req.body.victimization.was_other,
            additional_notes: req.body.additional_notes,
            was_mandatory_report: req.body.was_mandatory_report,
            reporting_advocate_name: req.body.reporting_advocate_name,
            reporting_date: req.body.reporting_date,
            location_evidentiary: req.body.location_evidentiary,
            location_evidentiary_name: req.body.location_evidentiary_name,
            location_evidentiary_nurse: req.body.location_evidentiary_nurse,
            immediate_referral: req.body.immediate_referral,
            immediate_referral_notes: req.body.immediate_referral_notes,
            shelter_referral: req.body.shelter_referral,
            shelter_referral_name: req.body.shelter_referral_name,
            taxi_provided: req.body.taxi_provided,
            taxi_cost: req.body.taxi_cost,
            release_completed: req.body.release_completed,
            release_completed_date: req.body.release_completed_date,
            release_completed_reason: req.body.release_completed_reason,
            mapc_followup: req.body.mapc_followup,
            debrief_complete: req.body.debrief_complete,
            debrief_complete_date: req.body.debrief_complete_date,
            debrief_complete_staff: req.body.debrief_complete_staff,
            followup_complete: req.body.followup_complete,
            followup_complete_date: req.body.followup_complete_date,
            followup_complete_agency: req.body.followup_complete_agency,
            date_form_complete_mapc: req.body.date_form_complete_mapc,
            expiration_date: req.body.expiration_date,
            ma_form_time: req.body.ma_form_time
        }

        pool.connect(function (errorConnectingToDB, db, done) {
            if (errorConnectingToDB) {
                res.sendStatus(500);
            } else {
                var queryText = 'UPDATE "ma_form_data" SET  "advocate_name"= $1, "advocate_name_additional" =$2, location_name=$3, ' +
                    'was_adult_sexual_assault=$4, was_sexual_exploitation=$5, was_minor_family=$6, ' +
                    'was_minor_other=$7, was_other=$8, additional_notes=$9, was_mandatory_report=$10,' +
                    'reporting_advocate_name=$11,reporting_date=$12,location_evidentiary=$13,location_evidentiary_name=$14,location_evidentiary_nurse=$15,' +
                    'immediate_referral=$16, immediate_referral_notes=$17, shelter_referral=$18, ' +
                    'shelter_referral_name=$19,taxi_provided=$20,taxi_cost=$21,release_completed=$22,release_completed_date=$23,' +
                    'release_completed_reason=$24,mapc_followup=$25, debrief_complete=$26, debrief_complete_date=$27,' +
                    'debrief_complete_staff=$28,followup_complete=$29,followup_complete_date=$30,followup_complete_agency=$31,' +
                    'date_form_complete_mapc=$32,expiration_date=$33, ma_form_time=$34  WHERE"ma_id"=$35;';
                db.query(queryText, [ma.advocate_name, ma.advocate_name_additional, ma.location_name,
                ma.was_adult_sexual_assault, ma.was_sexual_exploitation, ma.was_minor_family,
                ma.was_minor_other, ma.was_other, ma.additional_notes, ma.was_mandatory_report,
                ma.reporting_advocate_name, ma.reporting_date, ma.location_evidentiary,
                ma.location_evidentiary_name, ma.location_evidentiary_nurse, ma.immediate_referral,
                ma.immediate_referral_notes, ma.shelter_referral, ma.shelter_referral_name,
                ma.taxi_provided, ma.taxi_cost, ma.release_completed, ma.release_completed_date,
                ma.release_completed_reason, ma.mapc_followup, ma.debrief_complete,
                ma.debrief_complete_date, ma.debrief_complete_staff, ma.followup_complete,
                ma.followup_complete_date, ma.followup_complete_agency,
                ma.date_form_complete_mapc, ma.expiration_date, ma.ma_form_time, id],
                    function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            res.sendStatus(500);
                        } else {
                            res.send(result.rows);
                        }
                    });
            }
        });
    } else {
        res.send(false);
    }
});

router.put('/update/la/:id', function (req, res) {
    // check if logged in

    if (req.isAuthenticated()) {
        var id = req.params.id;
        var la = {
            date: req.body.date,
            advocate_name: req.body.advocate_name,
            county: req.body.county,
            officer_involved: req.body.officer_involved,
            officer_involved_additional: req.body.officer_involved_additional,
            officer_involved_additional_two: req.body.officer_involved_additional_two,
            case_number: req.body.case_number,
            type_of_report: req.body.type_of_report
        }

        pool.connect(function (errorConnectingToDB, db, done) {
            if (errorConnectingToDB) {
                res.sendStatus(500);
            } else {
                var queryText = 'UPDATE "la_form_data" SET date = $1, advocate_name=$2, county=$3,' +
                    'officer_involved=$4, officer_involved_additional=$5,officer_involved_additional_two=$6,' +
                    'case_number=$7,type_of_report=$8  WHERE "la_form_id"=$9;';
                db.query(queryText, [la.date, la.advocate_name, la.county, la.officer_involved,
                la.officer_involved_additional, la.officer_involved_additional_two,
                la.case_number, la.type_of_report, id],
                    function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            res.sendStatus(500);
                        } else {
                            res.send(result.rows);
                        }
                    });
            }
        });
    } else {
        res.send(false);
    }
});

router.put('/update/referral/:id', function (req, res) {
    if (req.isAuthenticated()) {
        var id = req.params.id;
        var referral = {
            referral_location_name: req.body.referral_location_name,
            is_first_attempt_date: req.body.is_first_attempt_date,
            is_second_attempt_date: req.body.is_second_attempt_date,
            is_third_attempt_date: req.body.is_third_attempt_date,
            expiration_date: req.body.expiration_date,
            was_shredded: req.body.was_shredded
        }
        pool.connect(function (errorConnectingToDB, db, done) {
            if (errorConnectingToDB) {
                res.sendStatus(500);
            } else {
                var queryText = 'UPDATE "referral_form_data" SET referral_location_name = $1, is_first_attempt_date=$2,' +
                    'is_second_attempt_date=$3,is_third_attempt_date=$4,expiration_date=$5,was_shredded=$6  WHERE "referral_form_id" = $7 ;';
                db.query(queryText, [referral.referral_location_name, referral.is_first_attempt_date,
                referral.is_second_attempt_date, referral.is_third_attempt_date, referral.expiration_date,
                referral.was_shredded, id],
                    function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            res.sendStatus(500);
                        } else {
                            res.send(result.rows);
                        }
                    });
            }
        });
    } else {
        res.send(false);
    }
});

router.put('/update/release/:id', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        var id = req.params.id;
        var release = {
            purpose: req.body.purpose,
            was_contact_made: req.body.was_contact_made,
            contact_date: req.body.contact_date,
            contacted_by: req.body.contacted_by,
        }

        pool.connect(function (errorConnectingToDB, db, done) {
            if (errorConnectingToDB) {
                res.sendStatus(500);
            } else {
                var queryText = 'UPDATE "release_form_data" SET purpose = $1, was_contact_made = $2,' +
                    'contact_date = $3, contacted_by=$4  WHERE "release_form_id" = $5 ;';
                db.query(queryText, [release.purpose, release.was_contact_made, release.contact_date,
                release.contacted_by, id], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
            }
        });
    } else {
        res.send(false);
    }
});

router.get('/form/search', function (req, res) { //search for a case, return the form table data
    // check if logged in
    if (req.isAuthenticated()) {
        
        var query = {
            start_date: req.query.start_date,
            end_date: req.query.end_date,
        }
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                console.log('Error connecting', errorConnectingToDb);
                res.sendStatus(500);
            } else {
                var queryText = 'SELECT f.* ' +
                    'FROM "public"."green_form_data" g ' +
                    'INNER JOIN "public"."form" f ON f."green_form_id" = g."green_form_id" ' +
                    'WHERE g."date" BETWEEN $1 AND $2 ; ';
                    
                db.query(queryText,[query.start_date, query.end_date], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                }); // END QUERY
            }
        });
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
    }
});

module.exports = router;
