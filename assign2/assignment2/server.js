const http = require('http');
const pug = require("pug");
const fs = require("fs");
const path = require("path");

// Initialize restaurants with data for stats page
let restaurant_data = {};

let restaurant = {};


//Pug functions to render various pages
const renderHome = pug.compileFile('views/pages/index.pug');
const renderOrder = pug.compileFile("views/pages/order.pug");
const renderStats = pug.compileFile("views/pages/stats.pug");


//Helper function to send a 404 error
function send404(response) {
    response.statusCode = 404;
    response.write("Unknown resource.");
    response.end();
}

// Helper function to show results on stats page
function getRestaurantDetailsToShow(order_details, default_details) {
    let details = [];
    // Iterating over the array of objects for ALL the restaurants and show all the names of the restaurants with the default details 
    for (let i of default_details) {
        let each_rest = {};
        each_rest.restaurant = order_details[i.restaurant] ? order_details[i.restaurant].restaurant : i.restaurant;
        // Checking if the order details exist and use those if they exist instead of default values 
        each_rest.order_count = order_details[i.restaurant] !== undefined && order_details[i.restaurant].order_count ? order_details[i.restaurant].order_count : i.order_count;
        each_rest.avg_total = order_details[i.restaurant] !== undefined && order_details[i.restaurant].avg_total ? order_details[i.restaurant].avg_total : i.avg_total;
        each_rest.popular = order_details[i.restaurant] !== undefined && order_details[i.restaurant].popular ? order_details[i.restaurant].popular : i.popular;
        details.push(each_rest);
    }
    return details;
}

//Helper function to find the number of orders pertaining to each restaurant and based off of this we can check which item is most popular 
function getOrderDetailsOfEachRestaurant(rest) {
    // console.log(rest);
    rest.forEach(res => {
        const entry = JSON.parse(res);
        // console.log(entry);

        const each_rest = entry["restaurant"];
        // if the restaurant doesn't exist, then initialize the restaurant 
        if (!restaurant_data.hasOwnProperty(entry["restaurant"])) {
            restaurant_data[each_rest] = {};
            restaurant_data[each_rest].restaurant = each_rest;
            restaurant_data[each_rest].total = 0;
            restaurant_data[each_rest].order_count = 0;
            restaurant_data[each_rest].avg_total = 0;
            restaurant_data[each_rest].popular = entry["popular"];
            restaurant_data[each_rest].qty = entry["qty"];
        }
        // checks if the new quantity has more than the initial item then it assigns it to be the 'popular' item 
        if (restaurant_data[each_rest].qty < entry["qty"]) {
            restaurant_data[each_rest].popular = entry["popular"];
            restaurant_data[each_rest].qty = entry["qty"];
        }
        // this gets the total order count and the average total orders 
        let current_total = Number.parseFloat(restaurant_data[each_rest].total);
        let added_total = Number.parseFloat(entry["total"]);
        restaurant_data[each_rest].total = Number.parseFloat(current_total + added_total).toFixed(2);
        restaurant_data[each_rest].order_count++;
        restaurant_data[each_rest].avg_total = Number.parseFloat(restaurant_data[each_rest].total / restaurant_data[each_rest].order_count).toFixed(2);

        // console.log(restaurant_data);
    });

    // console.log(restaurant_data);
    return restaurant_data;

}

//Helper function to return all restaurant names
function getRestaurantDefaultDetails(rests) {
    let restaurant_names = [];
    Object.values(rests).forEach(rest => {
        let obj = {};
        // Populating the restaurant details with a default value 
        obj.restaurant = rest["name"];
        obj.order_count = 0;
        obj.avg_total = "NA";
        obj.popular = "NA";
        // console.log(rest["name"]);
        restaurant_names.push(obj);
    });
    return restaurant_names;
}

//Helper function to send a 500 error
function send500(response) {
    response.statusCode = 500;
    response.write("Server error.");
    response.end();
}

//Helper function to read all json files from restaurant dir
// this is called when the server starts, populates it with the restaurant details 
function getAllRestaurants(dir) {
    // creates a path to the restaurant folders 
    const dirPath = path.join(__dirname, dir);
    try {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const fileName = path.basename(filePath).replace(".json", "");
            const fileContent = fs.readFileSync(filePath, "utf8");
            restaurant[fileName] = JSON.parse(fileContent);
        });
        // console.log(restaurant);
        fs.writeFileSync(path.join(__dirname, "restaurant.txt"), JSON.stringify(restaurant), "utf8");
    } catch (err) {
        console.error(`Error: Unable to scan the directory due to ${err}`);
    }
}

const server = http.createServer(function(request, response) {

    if (request.method === "GET") {
        if (request.url === "/" || request.url === "/index") {
            let data = renderHome("./views/pages/index.pug", {});
            response.statusCode = 200;
            response.end(data);
            return;
        } else if (request.url === "/order") {
            // console.log(restaurant);
            let data = renderOrder();
            response.statusCode = 200;
            response.end(data);
            return;
        } else if (request.url === "/stats") {
            //getRestaurantDefaultDetails
            const default_details = getRestaurantDefaultDetails(restaurant);
            // Read contents from OrderStats file & send it to stats page.
            try {
                const fileContent = fs.readFileSync("./OrderStats.txt", { encoding: "utf8" });
                const arrayOfRecords = fileContent.split(";");
                let finalArray = arrayOfRecords.filter(item => item !== '');
                const order_details = getOrderDetailsOfEachRestaurant(finalArray);

                // check which data to send
                const rest_details = getRestaurantDetailsToShow(order_details, default_details);
                // console.log(rest_details);
                restaurant_data = {};
                let data = renderStats({ rest_details });
                response.statusCode = 200;
                response.end(data);
                return;
            } catch (err) {
                console.error(`Failure due to: ${err}`);
                // even if the file doesn't exist, it should still open the page 
                const rest_details = default_details;
                let data = renderStats({ rest_details });
                response.statusCode = 200;
                response.end(data);
                return;
            }
        } else if (request.url === "/add.jpg") {
            let data = fs.readFileSync("./add.jpg");
            response.setHeader("Content-type", "image/jpeg");
            response.statusCode = 200;
            response.end(data);
            return;
        } else if (request.url === "/remove.jpg") {
            let data = fs.readFileSync("./remove.jpg");
            response.setHeader("Content-type", "image/jpeg");
            response.statusCode = 200;
            response.end(data);
            return;
        } else if (request.url === "/client.js") {
            fs.readFile("client.js", function(err, data) {
                if (err) {
                    send500(response);
                    return;
                }
                response.statusCode = 200;
                response.end(data);
                return;
            });
        } else if (request.url === "/restaurant.txt") {
            fs.readFile("restaurant.txt", function(err, data) {
                if (err) {
                    send500(response);
                    return;
                }
                response.statusCode = 200;
                response.end(data);
                return;
            });
        } else {
            send404(response);
        }
    } else if (request.method === "POST") {
        if (request.url === "/stats") {
            console.log("Request received");
            let body = ""
            request.on('data', (chunk) => {
                body += chunk;
            })
            request.on('end', () => {
                try {
                    console.log(body);
                    fs.appendFileSync("./OrderStats.txt", body + ";");
                    response.statusCode = 200;
                    response.end();
                    return;
                } catch {
                    send404(response);
                }
            })
        } else {
            send404();
        }
    } else {
        send404(response);
    }
});

//Server listens on port 3000
server.listen(3000, getAllRestaurants("restaurants"));
console.log('Server running at http://127.0.0.1:3000/');