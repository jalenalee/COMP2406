
const http = require('http');
const pug = require("pug");
const fs = require("fs");

let storeMotto = "We break it, you buy it.";
//Initialize a list of 3 products
let products = [
	{id: 0, name: "Rusty Old Bike", price:15.99, featured: true},
	{id: 1, name: "Broken Wooden Chair", price:56.99, featured: true},
	{id: 2, name: "Rare Dinosaur Egg", price:9.99, featured: true}
]
let nextID = 3;

//Pug functions to render various pages
const renderHome = pug.compileFile('views/pages/index.pug');
const renderAbout = pug.compileFile("views/pages/about.pug");
const renderProducts = pug.compileFile("views/pages/products.pug");
const renderProduct = pug.compileFile("views/pages/product.pug");const renderAddProduct = pug.compileFile("views/pages/addproduct.pug");

//Helper function to send a 404 error
function send404(response){
	response.statusCode = 404;
	response.write("Unknown resource.");
	response.end();
}

//Helper function to send a 500 error
function send500(response){
	response.statusCode = 500;
	response.write("Server error.");
 	response.end();
}

const server = http.createServer(function (request, response) {
	if(request.method === "GET"){
		if(request.url === "/" || request.url === "/index.html"){
			let data = renderHome({storeMotto: storeMotto, featuredProducts: products});
			response.statusCode = 200;
			response.end(data);
		}else if(request.url === "/about"){
			let data = pug.renderFile("./views/pages/about.pug", {});
			response.statusCode = 200;
			response.end(data);
		}else if(request.url === "/products"){
			let data = renderProducts({products: products});
			response.statusCode = 200;
			response.end(data);
		}else if(request.url === "/addproduct"){
			let data = renderAddProduct({});
			response.statusCode = 200;
			response.end(data);
		}else if(request.url === "/addproduct.js"){
			fs.readFile("./addproduct.js", function(err, data){
				if(err){
					send500(response);
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "application/javascript");
				response.end(data);
			});
		}else if(request.url.startsWith("/products/")){
			let id = request.url.substring(10);
			try{
				id = Number(id)
				let found = products.find(elem => elem.id == id);
				if(found != null){
					let content = renderProduct({product: found});
					response.statusCode = 200;
					response.end(content);
				}else{
					send404(response);
				}
			}catch(err){
				console.log(err);
				send404(response);
			}
		}else{
			send404(response);
		}
	}else if(request.method === "POST"){
		if(request.url === "/products"){
			let body = ""
			request.on('data', (chunk) => {
				body += chunk;
			})
			request.on('end', () => {
				console.log(body);
				response.end(body);
			})
		}
	}else{
		send404(response);
	}
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');