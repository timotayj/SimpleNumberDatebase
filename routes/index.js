var express = require('express');
var router = express.Router();


var mongoose = require( 'mongoose' );
var Numbers     = mongoose.model( 'Numbers' );



router.get('/', function(req, res, next) {
    Numbers.find({Numbers: Numbers}).
        exec(function (err, Numbers) {
            if (err) return next(err);

            res.render('index', {

                'Numbers': Numbers
            });
        });
});


router.post('/', function(req, res) {

    new Numbers({newNumber : req.body.inputNumber})
        .save(function (err, inputNumber) {
        console.log(inputNumber)
        res.redirect('/')

    });
});








module.exports = router;


