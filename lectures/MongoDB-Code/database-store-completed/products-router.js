
const config = require("./config.json");
const express = require('express');
const path = require('path');
const fs = require("fs");
const faker = require('faker');
let router = express.Router();

//Requests for /products
//Specify three functions to handle in order
router.get("/", queryParser);
router.get("/", loadProductsDatabase);
router.get("/", respondProducts);

//You can also specify multiple functions in a row
router.post("/", express.json(), createProduct);

//Requests for a specific product
router.get("/:id", getProduct, sendSingleProduct);
router.put("/:id", express.json(), saveProduct);

//Parse the query parameters
//limit: integer specifying maximum number of results to send back
//page: the page of results to send back (start is (page-1)*limit)
//name: string to find in product name to be considered a match
//minprice: the minimum price to find
//maxprice: the maximum price to find
function queryParser(req, res, next){
	const MAX_PRODUCTS = 50;
	
	//build a query string to use for pagination later
	let params = [];
	for(prop in req.query){
		if(prop == "page"){
			continue;
		}
		params.push(prop + "=" + req.query[prop]);
	}
	req.qstring = params.join("&");
	
	try{
		if(!req.query.limit){
			req.query.limit = 10;
		}	
		
		req.query.limit = Number(req.query.limit);
		
		if(req.query.limit > MAX_PRODUCTS){ 
			req.query.limit = MAX_PRODUCTS;
		}
	}catch{
		req.query.limit = 10;
	}
	
	//Parse page parameter
	try{
		if(!req.query.page){
			req.query.page = 1;
		}
		
		req.query.page = Number(req.query.page);
		
		if(req.query.page < 1){
			req.query.page = 1;
		}
	}catch{
		req.query.page = 1;
	}
	
	if(req.query.minprice){
		try{
			req.query.minprice = Number(req.query.minprice);
		}catch(err){
			req.query.minprice = undefined;
		}
	}
	
	if(req.query.maxprice){
		try{
			req.query.maxprice = Number(req.query.maxprice);
		}catch{
			req.query.maxprice = undefined;
		}
	}
	
	next();
}

//Loads a product and adds it to request object
function getProduct(req, res, next){
	let id = Number(req.params.id);
	console.log("id: " + id);
	
	req.app.locals.db.collection("products").findOne({id:id}, function(err, result){
		if(err){
			console.log(err);
			res.status(500).send("error reading product.");
			return;
		}
		
		if(!result){
			res.status(404).send("Could not find a product with that ID");
			return;
		}
		
		console.log("result");
		console.log(result);
		req.product = result;
		next()
	});
}

//Saves a product using the request body
//Users for updating products with a PUT request
function saveProduct(req, res, next){
	let id = req.params.id;
	let fileName = path.join(".", config.productDir, id + ".json");
	if(fs.existsSync(fileName)){
		fs.writeFileSync(fileName, JSON.stringify(req.body));
		res.status(200).send("User saved.");
	}else{
		res.status(404).send("Could not find user.");
	}
}

//Helper function for determining whether a product
// matches the query parameters. Compares the name,
// min price, and max price. All must be true.
//Again, different systems may have different logic
function productMatch(product, query){
	let nameCheck = (!query.name) || product.name.toLowerCase().includes(query.name.toLowerCase());
	let minPriceCheck = (!query.minprice) || product.price >= query.minprice;
	let maxPriceCheck = (!query.maxprice) || product.price <= query.maxprice;
	return nameCheck && minPriceCheck && maxPriceCheck;
}

function loadProductsDatabase(req, res, next){
	let startIndex = ((req.query.page-1) * Number(req.query.limit));
	let amount = req.query.limit;
	let options = {skip:startIndex, limit:amount};
	
	let query = {};
	
	let priceQuery = {}
	if(req.query.minprice){
		priceQuery["$gte"] = req.query.minprice;
	}
	if(req.query.maxprice){
		priceQuery["$lte"] = req.query.maxprice;
	}
	if(req.query.minprice || req.query.maxprice){
		query["price"] = priceQuery;
	}
	
	if(req.query.name){
		query.name = {"$regex" : ".*" + req.query.name + ".*", "$options": "i"};
	}
	
	console.log("query");
	console.log(query);
	
	req.app.locals.db.collection("products").find(query, options).toArray(function(err, result){
		if(err){
			res.status(500).send("Error reading products.");
			console.log(err);
			return;
		}
		res.products = result;
		next();
		return;
	});	
}

//Load the correct products into the result object
//Works similar to user router, but has different checks
// for product matching (min price, max price)
function loadProducts(req, res, next){
	let results = [];
	let startIndex = (req.query.page-1) * Number(req.query.limit);
	let endIndex = startIndex + Number(req.query.limit);
	let countLoaded = 0;
	let failed = false;
	
	//Read all files in the directory
	fs.readdir(path.join(".", config.productDir), function(err, items) {
		let count = 0;
		//For each product file
		for (let fileNum=0; fileNum < items.length; fileNum++) {
			//Read the products data and create an object
			let data = fs.readFileSync(path.join(".", config.productDir, items[fileNum]));
			let product = JSON.parse(data);
			
			//If the product matches the query parameters
			if(productMatch(product, req.query)){
				//Add to results if we are at the correct index
				if(count >= startIndex){
					results.push(product);
				}
				
				//Stop if we have the correct number of results
				if(results.length >= req.query.limit){
					break;
				}
				
				count++;
			}
			
		}
		//Set the property to be used in the response
		res.products = results;
		next();
	});
}

//Sends an array of products in response to a request
//Uses the products property added by previous middleware
//Sends either JSON or HTML
function respondProducts(req, res, next){
	res.format({
		"text/html": () => {res.render("pages/products", {products: res.products, qstring: req.qstring, current: req.query.page } )},
		"application/json": () => {res.status(200).json(res.products)}
	});
	next();
}

//Create a new random product in response to POST /products
//Again, in a real system, we would likely provide a page
// to specify a new products information
function createProduct(req, res, next){
	//Generate a random product
	let p = {};
	p.id = config.nextProductID;
	p.name = faker.commerce.productName();
	p.price = faker.commerce.price();
	p.reviews = [];
	p.buyers = [];

	//Update config and save the product to a file
	config.nextProductID++;
	fs.writeFileSync("config.json", JSON.stringify(config));
	fs.writeFileSync(path.join(".", config.productDir, p.id + ".json"), JSON.stringify(p));
	res.status(201).send(p);
}

//Create and send representation of a single product
//Sends either JSON or HTML
function sendSingleProduct(req, res, next){
	res.format({
		"application/json": function(){
			res.status(200).json(req.product);
		},
		"text/html": () => { res.render("pages/product", {product: req.product}); }		
	});
	
	next();
}

//Export the router so it can be mounted in the main app
module.exports = router;