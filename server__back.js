// server.js

// BASIC SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to APP Workshop Week 2!' });   
});

// more routes for our API will happen here

// We will simulate a database output, for a real app you should use an ORM an create a data model to work through the different CRUD operations
var cars = [
            {
                id : 1,
                license : "abc123"
            },
            {
                id : 2,
                license : "abc124"
            },
            {
                id : 3,
                license : "abc126"
            }
        ];

router.route('/car') //this route is generic, so it will be used for generic operations as list all or create
    .get(function(req, res){
        // Get ALL the cars
        
        res.json(cars); //return a json object
    })
    .post(function(req, res){
        console.log(req.body.license); //How to read data that was sent it to your API
        res.sendStatus(201); //Example of how to send an specific status code by default always returns 200
    });

router.route('/car/:id/') //route to work with specific car using an ID (for this case POST doesn't make sense)
    .get(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        //add code that find the car with the corresponding id

        cars.forEach(function(element) {
            if (element.id == id) {
                res.json(element);
                res.end();
            }
        });
        
       
    })
    .patch(function(req, res){
        
    }).put(function(req, res){
        
    });

    router.route('/driver') //each entity should have specific and generic paths or routes.
    .get(function(req, res){
        
    })
    .post(function(req, res){
        
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Service running on port ' + port);

module.exports = app;