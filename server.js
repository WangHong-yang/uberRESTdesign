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


// =============================================================================
// CARS RESTful

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

router.route('/cars')
	.get(function(req,res) {
		res.json(cars);
	})
	.post(function(req,res) {
		var reqBody = req.body;
		var newCar = new Object();
		for (var prop in carsPropList) {
            // id should not be changed
			if (prop === "id") {newCar[prop] = cars.length+1;}  
			else {newCar[prop] = reqBody[prop];}
		}
		cars.push(newCar);
		res.sendStatus(200);
		console.log(cars);
	})

router.route('/cars/:id/') //route to work with specific car using an ID (for this case POST doesn't make sense)
    .get(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var carObj = cars.filter(function(element) {
            return element.id == id;
        })[0];
        if(carObj === undefined) {
            console.log("No car ID found!");
            res.end();
        } else {
            res.json(carObj);
            res.end();
        }
    })
    .patch(function(req, res){
        var id = req.params.id;        
        var carObj = cars.filter(function(element) {
            return element.id == id;
        })[0];
        if(carObj === undefined) {
            console.log("No car ID found!");
            res.sendStatus(400)
               .end();
        } else {
            var reqBody = req.body;
            for (var prop in carObj) {
                // id should not be changed
                if (prop === "id") {continue;}  
                // keep undefined prop in req body unchanged
                if (reqBody[prop] !== undefined) {  
                    carObj[prop] = reqBody[prop];
                }
            }
            console.log(cars);
            res.sendStatus(200)
               .end();
        }
    })
    .put(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var carObj = cars.filter(function(element) {
            return element.id == id;
        })[0];
        if(carObj === undefined) {
            console.log("No car ID found!");
            res.sendStatus(400)
               .end();
        } else {
            var reqBody = req.body;
            for (var prop in carObj) {
                // id should not be changed
                if (prop === "id") {continue;}  
                else {carObj[prop] = reqBody[prop];}
            }
            console.log(cars);
            res.sendStatus(200)
               .end();
        }
    })
    .delete(function(req, res){
    	var id = req.params.id;      
        var filtered = cars.filter(function(element) {
            return element.id != id;
        });
        cars = filtered
        console.log(cars);
        res.sendStatus(200);
        res.end();
    })


// =============================================================================
// DRIVER RESTful
var drivers = [{
                id: 1,
                name: "Hubert",
                email: "hongyang.wang@sv.cmu.edu",
                phone: "6502658759",
                carID: 100,
            }, {
                id: 2,
                name: "Hongyang",
                email: "hongyang.wang@west.cmu.edu",
                phone: "6502658759",
                carID: 2,
            }];
var driversPropList = {id:"", name:"", email:"", phone:"", carID:""};

router.route('/drivers') //each entity should have specific and generic paths or routes.
    .get(function(req, res){
        res.json(drivers);
    })
    .post(function(req, res){
        var reqBody = req.body;
        var newDriver = new Object();
        for (var prop in driversPropList) {
            // id should not be changed
            if (prop === "id") {newDriver[prop] = drivers.length+1;}  
            else {newDriver[prop] = reqBody[prop];}
        }
        drivers.push(newDriver);
        res.sendStatus(200);
        console.log(drivers);
    });

router.route('/drivers/:id/') //route to work with specific car using an ID (for this case POST doesn't make sense)
    .get(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var idFound = false;
        drivers.forEach(function(element) {
            if (element.id == id) {
                idFound = true;
                res.json(element);
                res.end();
            }
        })
        // if no corresponding id car found
        if (!idFound) {
            console.log("No driver ID found!");
            res.end();
        }
    })
    .patch(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var idFound = false;
        drivers.forEach(function(element) {
            if (element.id == id) {
                idFound = true;
                var reqBody = req.body;
                for (var prop in element) {
                    if (prop === "id") {continue;}  // id should not be changed
                    if (reqBody[prop] !== undefined) {  // keep undefined prop in req body unchanged
                        element[prop] = reqBody[prop];
                    }
                }
                console.log(drivers);
                res.sendStatus(200);
                res.end();
            } 
        })
        // if no corresponding id car found
        if (!idFound) {
            console.log("No driver ID found!");
            res.sendStatus(400);
            res.end();
        }
    })
    .put(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var idFound = false;
        drivers.forEach(function(element) {
            if (element.id == id) {
                idFound = true;
                var reqBody = req.body;
                for (var prop in element) {
                    if (prop === "id") {continue;}  // id should not be changed
                    element[prop] = reqBody[prop];  // update all element prop
                }
                console.log(drivers);
                res.sendStatus(200);
                res.end();
            }
        })
        // if no corresponding id car found
        if (!idFound) {
            console.log("No driver ID found!");
            res.end();
        }
    })
    .delete(function(req, res){
        var id = req.params.id;      
        var idFound = false;
        for (var i = 0; i < drivers.length; i++) {
            if (drivers[i].id == id) {
                idFound = true;
                drivers.splice(i, 1);
                console.log(drivers);
                res.sendStatus(200);
                res.end();
            }
        }
        // if no corresponding id car found
        if (!idFound) {
            console.log("No driver ID found!");
            res.end();
        }
    });
// get drive's car info
router.route('/drivers/:id/car')
    .get(function(req, res){
        var id = req.params.id;
        var driverObj = drivers.filter(function(element) {
            return element.id == id;
        })[0];
        if (driverObj === undefined) {
            // driver id not found
            console.log("No driver ID found!");
            res.sendStatus(400)
               .end();
        } else {
            // find car object
            var carObj = cars.filter(function(element) {
                return element.id == driverObj.carID;
            })[0];
            if (carObj === undefined) {
                // car id not found
                console.log("No car ID found!");
                res.sendStatus(400)
                   .end();
            } else {
                // print car Object
                res.json(carObj)
                   .end();
            }
        }
    })

// =============================================================================
// PASSENGER RESTful
var passengers = [{
                id: 1,
                name: "Hubert",
                email: "hongyang.wang@sv.cmu.edu",
                phone: "6502658759"
            }, {
                id: 2,
                name: "Hongyang",
                email: "hongyang.wang@west.cmu.edu",
                phone: "6502658759"
            }];
var passengersPropList = {id:"", name:"", email:"", phone:""};

router.route('/passengers') //each entity should have specific and generic paths or routes.
    .get(function(req, res){
        res.json(passengers);
    })
    .post(function(req, res){
        var reqBody = req.body;
        var newPassenger = new Object();
        for (var prop in passengersPropList) {
            // id should not be changed
            if (prop === "id") {newPassenger[prop] = passengers.length+1;}  
            else {newPassenger[prop] = reqBody[prop];}
        }
        passengers.push(newPassenger);
        res.sendStatus(200);
        console.log(passengers);
    });

router.route('/passengers/:id/') //route to work with specific car using an ID (for this case POST doesn't make sense)
    .get(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var idFound = false;
        passengers.forEach(function(element) {
            if (element.id == id) {
                idFound = true;
                res.json(element);
                res.end();
            }
        })
        // if no corresponding id car found
        if (!idFound) {
            console.log("No passenger ID found!");
            res.end();
        }
    })
    .patch(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var idFound = false;
        passengers.forEach(function(element) {
            if (element.id == id) {
                idFound = true;
                var reqBody = req.body;
                for (var prop in element) {
                    if (prop === "id") {continue;}  // id should not be changed
                    if (reqBody[prop] !== undefined) {  // keep undefined prop in req body unchanged
                        element[prop] = reqBody[prop];
                    }
                }
                console.log(passengers);
                res.sendStatus(200);
                res.end();
            } 
        })
        // if no corresponding id car found
        if (!idFound) {
            console.log("No passenger ID found!");
            res.sendStatus(400);
            res.end();
        }
    })
    .put(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var idFound = false;
        passengers.forEach(function(element) {
            if (element.id == id) {
                idFound = true;
                var reqBody = req.body;
                for (var prop in element) {
                    if (prop === "id") {continue;}  // id should not be changed
                    element[prop] = reqBody[prop];  // update all element prop
                }
                console.log(passengers);
                res.sendStatus(200);
                res.end();
            }
        })
        // if no corresponding id car found
        if (!idFound) {
            console.log("No passenger ID found!");
            res.end();
        }
    })
    .delete(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var idFound = false;
        for (var i = 0; i < passengers.length; i++) {
            if (passengers[i].id == id) {
                idFound = true;
                passengers.splice(i, 1);
                console.log(passengers);
                res.sendStatus(200);
                res.end();
            }
        }
        // if no corresponding id car found
        if (!idFound) {
            console.log("No passenger ID found!");
            res.end();
        }
    })

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Service running on port ' + port);

module.exports = app;