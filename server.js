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
    res.json({ message: 'This is Hubert\'s Uber REST design' });   
});

// more routes for our API will happen here

var cars = [{
				id: 1,
				year: 2012,
				maker: "BMW",
				model: "9 series",
				doorNum: 4,
				passNum: "123456",
				license: "mycar1",
				driverID: 1111111,
				insurance: "1000000"
			}, {
				id: 2,
				year: 2016,
				maker: "Porsche",
				model: "911 TURBO",
				doorNum: 2,
				passNum: "543210",
				license: "coolCar",
				driverID: 555555,
				insurance: "10000000"
			}];
var carsPropList = {id:"", year:"", maker:"", model:"", doorNum:"", passNum:"", license:"", driverID:"", insurance:""};

router.route('/car')
	.get(function(req,res) {
		res.json(cars);
	})
	.post(function(req,res) {
		var reqBody = req.body;
		var newCar = new Object();
		for (var prop in carsPropList) {
			if (prop === "id") {newCar[prop] = cars.length+1;}  // id should not be changed
			else {newCar[prop] = reqBody[prop];}
		}
		cars.push(newCar);
		res.sendStatus(200);
		console.log(cars);
	})

router.route('/car/:id/') //route to work with specific car using an ID (for this case POST doesn't make sense)
    .get(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var idFound = false;
        cars.forEach(function(element) {
            if (element.id == id) {
            	idFound = true;
                res.json(element);
                res.end();
            }
        })
        // if no corresponding id car found
        if (!idFound) {
        	console.log("No car ID found!");
        	res.end();
        }
    })
    .patch(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var idFound = false;
        cars.forEach(function(element) {
            if (element.id == id) {
            	idFound = true;
            	var reqBody = req.body;
            	for (var prop in element) {
            		if (prop === "id") {continue;}  // id should not be changed
            		if (reqBody[prop] !== undefined) {  // keep undefined prop in req body unchanged
            			element[prop] = reqBody[prop];
            		}
            	}
                console.log(cars);
                res.sendStatus(200);
                res.end();
            } 
        })
        // if no corresponding id car found
        if (!idFound) {
        	console.log("No car ID found!");
        	res.sendStatus(400);
        	res.end();
        }
    })
    .put(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var idFound = false;
        cars.forEach(function(element) {
            if (element.id == id) {
            	idFound = true;
            	var reqBody = req.body;
            	for (var prop in element) {
            		if (prop === "id") {continue;}  // id should not be changed
            		element[prop] = reqBody[prop];  // update all element prop
            	}
                console.log(cars);
                res.sendStatus(200);
                res.end();
            }
        })
        // if no corresponding id car found
        if (!idFound) {
        	console.log("No car ID found!");
        	res.end();
        }
    })
    .delete(function(req, res){
    	var id = req.params.id;  //Read the value of the param defined in the route :id      
        var idFound = false;
        for (var i = 0; i < cars.length; i++) {
        	if (cars[i].id == id) {
        		idFound = true;
        		cars.splice(i, 1);
                console.log(cars);
                res.sendStatus(200);
                res.end();
        	}
        }
        // if no corresponding id car found
        if (!idFound) {
        	console.log("No car ID found!");
        	res.end();
        }
    })

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