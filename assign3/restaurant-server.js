const express = require('express');
const path = require("path");
const fs = require("fs");
// const config = require("./config.json");
let restaurants = {};
var bodyParser = require('body-parser');

// create application/json parser (do i need this?)
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser (middleware that pasts post data for us)
var urlencodedParser = bodyParser.urlencoded({ extended: false });



const app = express();
// adds ejs into our express app 
app.set('view engine', 'ejs');
app.set("views", "./views/pages");

// use res.render to load up an ejs view file
function home(req, res) {
    res.render("pages/index", {});
}

// app.get("/", home);
// app.get("/add", )

// do i need the next thing 
app.get("/", (req, res) => {
    res.render('index');
    res.json({ msg: "Welcome to the Restaurants Page" });
})

app.get("/restaurants", (req, res) => {
    res.render('restaurants', { restaurants })
    console.log(restaurants.rests.id);
    res.json({ rests: restaurants });

})

// question 3
app.get("/addrestaurant", (req, res) => {
    // is this right? 
    res.render('Restaurant added', { output: req.body.id });
})

// post :id because you want to post to that SPECIFIC page
app.post("/restaurant/:id", urlencodedParser, (req, res) => {
    console.log(req.body);
    // is this right? the .id part? 
    let id = req.body.id;
    res.redirect('/restaurant/:id' + id);
})

app.post("/restaurants", (req, res) => {

})

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
            restaurants[fileName] = JSON.parse(fileContent);
        });
        // console.log(restaurant);
        fs.writeFileSync(path.join(__dirname, "restaurant.txt"), JSON.stringify(restaurants), "utf8");
    } catch (err) {
        console.error(`Error: Unable to scan the directory due to ${err}`);
    }
}

app.listen(3000, () => {
    console.log("server listening at http://localhost:3000");
    getAllRestaurants("restaurants");
});