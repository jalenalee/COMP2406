const express = require('express');
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");


let restaurants = {};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// adds ejs into our express app 
app.set('view engine', 'ejs');
app.set("views", "./views");

// do i need the next thing 
app.get("/", (req, res) => {
    res.render('pages/index', {});
    // res.json({ msg: "Welcome to the Restaurants Page" });
})

app.get("/restaurants", (req, res) => {
    if (req.headers["content-type"] == "application/json") {
        res.json({ restaurants });
    } else {
        res.render('pages/restaurants', { restaurants });
    }
});

app.get("/restaurants/:id", (req, res) => {
    let rest;
    for (let restaurant in restaurants) {
        if (restaurants[restaurant]["id"] == req.params.id) {
            rest = restaurants[restaurant];
        }
    }
    res.json({ restaurant: rest });

});


app.post("/restaurants", (req, res) => {
    // const id = uuid.v4();
    if (req.body.name && req.body.delivery_fee && req.body.min_order) {
        const restaurant = {
            id: uuid.v4(),
            name: req.body.name,
            delivery_fee: req.body.delivery_fee,
            min_order: req.body.min_order
        };

        const file = fs.writeFile(`./restaurants/${restaurant.name}.json`, JSON.stringify(restaurant), err => {
            if (err) throw err;
            console.log("Restaurant Created");
        });

        getAllRestaurants("restaurants");

        res.json({ restaurant });

        // res.redirect('/restaurant/:id' + id);
    }
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