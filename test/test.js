// unit test:
// ./node_modules/.bin/mocha -u exports test/test.js

// add this one in server.js
// module.exports = app;

var supertest = require("supertest");
assert = require("assert");
app = require("../server.js");

exports.car_should_return_cars = function(done){
	supertest(app)
	.get('/api/car')
	.expect(200)
	.end(done);
};

exports.car_should_return_json = function(done){
	supertest(app)
	.get('/api/car/1/')
	.expect(200)
	.end(function(err,response){
		console.log(err);
		console.log(response.body);
		assert.ok(!err);
		assert.ok(typeof response.body === 'object');
		return done();
	});
};

exports.car_should_create_car = function(done){
	supertest(app)
	.get('/api/car')
	.send({license: 'new license'})
	.expect(200)
	.end(function(err,response){
		console.log(err);
		console.log(response.body);
		assert.ok(!err);
		assert.ok(typeof response.body === 'object');
		return done();
	});
};