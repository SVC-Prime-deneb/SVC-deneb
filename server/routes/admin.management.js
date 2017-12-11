var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'helpwanted',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};



module.exports = router;
