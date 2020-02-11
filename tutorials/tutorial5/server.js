const http = require('http');
const pug = require("pug")
const url = require('url')

const renderHome = pug.compileFile('views/index.pug');
const renderHomeVar = pug.compileFile('views/indexVar.pug');
const renderHomeParam = pug.compileFile('views/indexParam.pug');
const renderHomeId = pug.compileFile('views/indexId.pug');

//might be useful for A2
testJson = {"firstname":"Fred", "lastname":"Flintstone"}

if(testJson.hasOwnProperty("firstname")){
    console.log("Found First name property.")
} 

if(testJson.hasOwnProperty("lastname")){
    console.log("Found last name property.")
}

if (testJson.hasOwnProperty("age")) {
    console.log("Age property found")
} else {
    console.log("Did not find an Age property.")
}

//Initialize server
const server = http.createServer(function (request, response) {
    if(request.url === "/"){       // localhost:3000/  does not passes a json object to the pug file
        indexPage = renderHome()
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        response.end(indexPage);
    } else if (request.url === "/indexVar"){ // localhost:3000/indexVar passes a json object to the pug file
        indexVarPage = renderHomeVar({"sample":{"name":"Sean"}})
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        response.end(indexVarPage);
    } else if(request.url.startsWith("/index/")) { // localhost:3000/index/Sean passes an id on URL and passes json object to the pug file
        let id = request.url.split("/")[2];
        console.log("Request URL with id: " + request.url.split("/"))
        indexIdPage = renderHomeId({sample:{name: id}})
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        response.end(indexIdPage);
    } else if (request.url.startsWith("/index?")) { // localhost:3000/index?firstname=Sean&lastname=Benjamin passes parameters on URL and passes json object to the pug file
        let indexParams = url.parse(request.url, true).query
        console.log(indexParams) 
        console.log("Parameter fisrtname:" + indexParams.firstname)
        console.log("Parameter lastname:" + indexParams.lastname)
        if (indexParams.firstname && indexParams.lastname) {
            fName = indexParams.firstname
            lName = indexParams.lastname
            indexParamPage = renderHomeParam({sample:{firstname: fName, lastname: lName}})
            response.statusCode = 200;
            response.setHeader("Content-Type", "text/html");
            response.end(indexParamPage);
        } else {
            send404(response)
        }
    } else {
        send404(response)
    }

});

//Start server
server.listen(3000);
console.log("Server listening at http://localhost:3000");

//Helper function to send a 404 error
function send404(response){
	response.statusCode = 404;
	response.write("Unknown resource.");
	response.end();
}