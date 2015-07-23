var express = require('express');
var router = express.Router();


var mongoose = require( 'mongoose' );
var Numbers     = mongoose.model( 'Numbers' );



router.get('/', function(req, res, next) {
    Numbers.find({ Numbers : Numbers }).
        exec( function ( err, Numbers ){
            if( err ) return next( err );

            res.render( 'index', {

                'Numbers' : Numbers
            });
        });
});





exports.create = function ( req, res, next ){
    new Numbers({
        newNumber    : req.body.content,

    }).save( function ( err, numbers, count ){
            if( err ) return next( err );

            res.redirect( '/' );
        });
};

module.exports = router;


