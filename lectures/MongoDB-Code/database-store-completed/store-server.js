const express = require('express');
const app = express();
const config = require("./config.json");
const mc = require("mongodb").MongoClient;

app.set("view engine", "pug");

//Require and mount the various routers
//There is one router for each main type of resource
let userRouter = require("./user-router");
app.use("/users", userRouter);
let productsRouter = require("./products-router");
app.use("/products", productsRouter);
let reviewsRouter = require("./reviews-router");
app.use("/reviews", reviewsRouter);

//Respond with home page data if requested
app.get('/', function(req, res) {
	app.locals.db.collection("config").findOne({id:"mainpage"}, function(err, result){
		if(err){
			res.status(500).send("Error reading main page config.");
			return;
		}
		res.render('pages/index', result);
	});
});

mc.connect("mongodb://localhost:27017", function(err, client) {
	if (err) {
		console.log("Error in connecting to database");
		console.log(err);
		return;
	}
	
	app.locals.db = client.db("store");
	
	let featured = [
		{name: "Rusty Old Bike", price:15.99},
		{name: "Broken Wooden Chair", price:56.99},
		{name: "Rare Dinosaur Egg", price:19.99}
	];
	let storeMotto = "We break it, you buy it.";
	
	app.locals.db.collection("config").replaceOne({id:"mainpage"}, {id:"mainpage", featured: featured, motto: storeMotto}, {upsert:true}, function(err, result){
		if(err){
			console.log("Error adding main page config.");
			return;
		}
		app.listen(3000);
		console.log("Server listening on port 3000");
	});
	
	
})


