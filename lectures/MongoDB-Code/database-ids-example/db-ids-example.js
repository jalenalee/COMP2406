const express = require('express');
const app = express();
const mc = require("mongodb").MongoClient;
let db;

app.set("view engine", "pug");

/*
In this example, we will just add documents with random numbers.
The _id generated by MongoDB will be used as the unique 
IDs for these resources. We can use the string version in our
web app. We just have to remember to translate it back to an
ObjectId before querying the database
*/
//We will need the mongodb ObjectID class
const ObjectID = require('mongodb').ObjectID;

app.use(express.static("public"));
app.get("/nums", listEntries);
app.post("/nums", createNewEntry);
app.get("/nums/:id", readEntry);

function createNewEntry(req, res, next){
	let newNum = Math.floor(Math.random()*100);
	
	db.collection("numbers").insertOne({num: newNum}, function(err, result){
		if(err){
			res.status(500).send("Error saving to database.");
			return;
		}
		let newID = result.insertedId;
		
		res.status(200).send("Added number " + newNum + " with _id " + result.insertedId);
		//One thing to consider here - we can actually redirect
		// the client to a new resource once we have created it.
	});
}

function listEntries(req, res, next){
	db.collection("numbers").find({}).toArray(function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		console.log(result);
		res.status(200).render("numlist", {nums: result});
	});
}

function readEntry(req, res, next){
	//This is the string value of the ID
	let id = req.params.id;
	
	console.log(id);
	//We can create an ObjectID version:
	let oid = new ObjectID(id);
	//Technically, we should try/catch this
	//It will throw an error if not in the proper format
	
	
	//The query uses the ObjectID version
	//If we just use the string id, no documents will match
	db.collection("numbers").findOne({"_id": oid}, function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		if(!result){
			res.status(404).send("That ID does not exist.");
			return;
		}
		res.status(200).render("numpage", result);
	});
}

mc.connect("mongodb://localhost:27017", function(err, client) {
	if (err) {
		console.log("Error in connecting to database");
		console.log(err);
		return;
	}
	
	//Set the app.locals.db variale to be the 'data' database
	db = client.db("mysite");
	app.listen(3000);
	console.log("Server listening on port 3000");
})
