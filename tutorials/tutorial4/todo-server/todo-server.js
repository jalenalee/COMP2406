const http = require('http');
const fs = require("fs");

//Create a server, giving it the handler function
//Request represents the incoming request object
//Response represents the outgoing response object
//Remember, you can break this apart to make it look cleaner
const server = http.createServer(function(request, response) {
    console.log(request.url);
    if (request.method === "GET") {
        if (request.url === "/" || request.url === "/todo.html") {
            //read the todo.html file and send it back
            fs.readFile("todo.html", function(err, data) {
                if (err) {
                    response.statusCode = 500;
                    response.write("Server error.");
                    response.end();
                    return;
                }
                response.statusCode = 200;
                response.setHeader("Content-Type", "text/html");
                response.write(data);
                response.end();
            });
        } else if (request.url === "/todo.js") {
            //read todo.js file and send it back
            fs.readFile("todo.js", function(err, data) {
                if (err) {
                    response.statusCode = 500;
                    response.write("Server error.");
                    response.end();
                    return;
                }
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/javascript");
                response.write(data);
                response.end();
            });
            //Add any more 'routes' and their handling code here
            //e.g., GET requests for "/list", POST request to "/list"
        } else if (request.url === "/list") {
            //read todo.js file and send it back
            fs.readFile("todo.js", function(err, data) {
                if (err) {
                    response.statusCode = 500;
                    response.write("Server error.");
                    response.end();
                    return;
                }
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/javascript");
                response.write(data);
                response.end();
            });
        } else {
            response.statusCode = 404;
            response.write("Unknwn resource.");
            response.end();
        }
    } else if (request.method === "POST") {
        //any handling in here
        response.statusCode = 404;
        response.write("Unknwn resource.");
        response.end();
    }
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');