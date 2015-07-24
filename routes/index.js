
//i've followed many tutorials to get this working:
// check out https://github.com/kacole2/express-node-mongo-skeleton


var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var mongoose = require( 'mongoose' );
var Numbers     = mongoose.model( 'Numbers' );
var  methodOverride = require('method-override');


//super important!
router.use(bodyParser.urlencoded({extended:true}))

router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))


router.route('/')
    .get( function(req, res, next) {
    Numbers.find({Numbers: Numbers}).
        exec(function (err, Numbers) {
            if (err) return next(err);

            res.render('index', {

                'Numbers': Numbers
            });
        })

    })
    .post(function (req, res) {

        new Numbers({newNumber: req.body.inputNumber})
            .save(function (err, inputNumber) {

                if(err){
                    return res.send(err);
                }
                console.log(inputNumber)
                res.redirect('/')

            });


    });

//define what id is, to use lower down
router.param('id', function(req, res, next, id) {

    mongoose.model('Numbers').findById(id, function (err, numbers) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                },
                json: function(){
                    res.json({message : err.status  + ' ' + err});
                }
            });

        } else {
            req.id = id;
            next();
        }
    });
});


router.route('/:id')
    .get(function(req, res) {
        mongoose.model('Numbers').findById(req.id, function (err, Numbers) {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
            } else {
                console.log('GET Retrieving ID: ' + Numbers._id);

                res.format({
                    html: function(){
                        res.render('show', {
                            "Numbers" : Numbers,

                        });
                    },
                    json: function(){
                        res.json(Numbers);
                    }
                });
            }
        });
    });






router.route('/:id/edit')
    .get(function(req, res) {
        mongoose.model('Numbers').findById(req.id, function (err, Numbers) {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
            } else {
                console.log('GET Retrieving ID: ' + Numbers._id);

                res.format({
                    html: function(){
                        res.render('edit', {
                            'Numbers': Numbers
                        });
                    },
                    json: function(){
                        res.json(Numbers);
                    }
                });
            }
        });
    })


    .delete(function(req, res) {
        mongoose.model('Numbers').findById(req.id, function(err, Numbers){
            if (err) {
                return console.error(err);
            }else{


                Numbers.remove(function(err,Numbers){
                    if (err) {
                        return console.error(err);
                    }else{
                        console.log('Item Deleted: ' + Numbers._id);
                        res.format({
                            html: function(){
                                res.redirect('/');
                            },
                            json: function(){
                                res.json()({message : 'deleted',
                                    item : Numbers});


                            }

                        })

                    }
                    }



                )



        }




        })

    });























module.exports = router;


