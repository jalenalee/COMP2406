const express = require('express');
const path = require("path");
const fs = require("fs");
// const config = require("./config.json");
let restaurants = {};
// const dbConnect = config.get("mongoDB");

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

// 1
app.get("/", (req, res) => {
    res.render('index');
    // res.json({ msg: "Welcome to the Restaurants Page" });
})

app.get("/restaurants", (req, res) => {
    // res.render('restaurants', { restaurants })
    res.json({ rests: restaurants });

})

app.get("/addrestaurant", (req, res) => {
    // is this right? 
    res.render('addrestaurant');
})

app.post("/restaurant", (req, res) => {

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