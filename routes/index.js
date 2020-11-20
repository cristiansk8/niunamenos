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
  router.get('/paint2', (req, res, next) => {
      // res.render('paint2');
      res.render('paint2');
    });
    router.get('/paint3', (req, res, next) => {
        // res.render('paint2');
        res.render('paint3');
      });
      router.get('/paint4', (req, res, next) => {
          // res.render('paint2');
          res.render('paint4');
        });









  module.exports = router;
