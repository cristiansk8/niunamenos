'use strict';

const express = require('express');
// const passport = require('passport');
const router = express.Router();


router.get('/', function (req, res) {
    // res.render('paint');
    res.render('home');

})

router.get('/paint', (req, res, next) => {
    // res.render('paint');
    res.render('paint');
  });

  module.exports = router;