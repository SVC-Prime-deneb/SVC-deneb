var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');
var path = require('path');

router.get('/get', function (req, res) {
  // check if logged in
  if (req.isAuthenticated(), req.user.is_super_admin === true) {
    console.log('req', req.user.is_super_admin);

  pool.connect(function (errorConnectingToDB, db, done) {
    if (errorConnectingToDB) {
      console.log('Error connecting to db', errorConnectingToDB);
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "advocates" ORDER BY "last_contacted_date";';
      db.query(queryText, function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery, result)
          res.sendStatus(500);
        } else {
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

router.post('/new', function (req, res) {
  var saveAd = {
    advocate_first_name: req.body.advocate_first_name,
    advocate_last_name: req.body.advocate_last_name,
    is_staff: req.body.is_staff,
    is_hcmc_approved: req.body.is_hcmc_approved,
    spanish: req.body.spanish,
    somali: req.body.somali,
    french: req.body.french,
    german: req.body.german,
    liberian: req.body.liberian,
    asl: req.body.asl,
    other_language: req.body.other_language,
    notes: req.body.notes,
    main_contact_phone: req.body.main_contact_phone,
    allow_text: req.body.allow_text,
    allow_call: req.body.allow_call,
    date_entered: req.body.date_entered,
    advocacy_start: req.body.advocacy_start,
  };
  console.log('new user:', saveAd);

  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      var queryText = 'INSERT INTO "advocates"("advocate_first_name","advocate_last_name","is_staff",' +
        '"is_hcmc_approved","spanish","somali","french","german","liberian","asl","other_language",'+
        '"notes","main_contact_phone","allow_text","allow_call","date_entered","advocacy_start")'+
        'VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17);';
      db.query(queryText, [saveAd.advocate_first_name, saveAd.advocate_last_name, saveAd.is_staff,
      saveAd.is_hcmc_approved, saveAd.spanish, saveAd.somali, saveAd.french,
      saveAd.german, saveAd.liberian, saveAd.asl, saveAd.other_language,
      saveAd.notes, saveAd.main_contact_phone, saveAd.allow_text,
      saveAd.allow_call, saveAd.date_entered, saveAd.advocacy_start]
      ,function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      }); // END QUERY
    }
  });
});//End POST route
//                            UPDATE ROUTES


router.put('/update/last/:id', function (req, res) {
  console.log('this req.body', req.body);

  var id = req.params.id
  var date = req.body.date
console.log(id);
console.log(date);


  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
      console.log("errorConnectingToDb", errorConnectingToDb);
    } else {
      var queryText = 'UPDATE "advocates" SET "last_contacted_date" = $1 WHERE "advocate_id" = $2;';
      console.log('query text', queryText);
      db.query(queryText, [date, id], function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          res.sendStatus(500);
          console.log('errorMakingQuery', errorMakingQuery);

        } else {
          res.sendStatus(201);
        }
      }); // END QUERY
    }
  });
});//End POST route
//TODO add forgot password and finish this route.
router.put('/update/:id', function (req, res) {
  console.log('update admin');
  // check if logged in

  if (req.isAuthenticated()) {
    var id = req.params.id;

    var updateAd = {
      advocate_first_name: req.body.advocate_first_name,
      advocate_last_name: req.body.advocate_last_name,
      is_staff: req.body.is_staff,
      is_hcmc_approved: req.body.is_hcmc_approved,
      spanish: req.body.spanish,
      somali: req.body.somali,
      french: req.body.french,
      german: req.body.german,
      liberian: req.body.liberian,
      asl: req.body.asl,
      other_language: req.body.other_language,
      notes: req.body.notes,
      main_contact_phone: req.body.main_contact_phone,
      allow_text: req.body.allow_text,
      allow_call: req.body.allow_call,
      date_entered: req.body.date_entered,
      advocacy_start: req.body.advocacy_start,
    };
    pool.connect(function (errorConnectingToDB, db, done) {
      if (errorConnectingToDB) {
        console.log('Error connecting to db', errorConnectingToDB);
        res.sendStatus(500);
      } else {
        var queryText = 'UPDATE "advocates" SET "advocate_first_name" = $1, "advocate_last_name" = $2, "is_staff" = $3,'+
        '"is_hcmc_approved"=$4 , "spanish"=$5, "somali"=$6, "french"=$7, "german"=$8, "liberian"=$9, "asl"=$10,"other_language"=$11,' +
          '"notes"=$12, "main_contact_phone"=$13, "allow_text"=$14, "allow_call"=$15, "date_entered"=$16, "advocacy_start"=$17 WHERE "advocate_id" = $18;';
        db.query(queryText, [updateAd.advocate_first_name, updateAd.advocate_last_name, updateAd.is_staff,
          updateAd.is_hcmc_approved, updateAd.spanish, updateAd.somali, updateAd.french,
          updateAd.german, updateAd.liberian, updateAd.asl, updateAd.other_language,
          updateAd.notes, updateAd.main_contact_phone, updateAd.allow_text,
          updateAd.allow_call, updateAd.date_entered, updateAd.advocacy_start, id],
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
        var queryText = 'DELETE FROM "advocates" WHERE advocate_id = $1 ;';
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
