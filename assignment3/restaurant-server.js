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


app.get("/", (req, res) => {
    res.render('pages/index', {});
    // res.json({ msg: "Welcome to the Restaurants Page" });
})

app.get("/restaurants", (req, res) => {
    if (req.headers["content-type"] == "application/json") {
        // stores the restaurant ids into an array 
        let rest_ids = [];
        for (let key in restaurants) {
            rest_ids.push(restaurants[key]["id"]);
        }
        // res.json({restaurants});
        res.json({ restaurants: rest_ids });
        return;
    } else {
        res.render('pages/restaurants', { restaurants });
        return;
    }
});

app.get("/restaurants/:id", (req, res) => {
    let rest;
    for (let restaurant in restaurants) {
        // checking if the id that has been requested matches an existing id 
        if (restaurants[restaurant]["id"] == req.params.id) {
            // if it does it will use that restaurant 
            rest = restaurants[restaurant];
        }
    }
    if (req.headers["content-type"] == "application/json") {
        // this is to render for postman 
        res.json({ restaurant: rest });
    } else {
        // console.log(rest);
        // this is for the HTML page 
        res.render("pages/restaurant", { restaurant: rest });
    }

});

app.put("/restaurants/:id", (req, res) => {
    // console.log("Value Received from Client" + JSON.stringify(req.body));
    // Check whether restaurant exists
    const dirPath = path.join(__dirname, "restaurants");
    let found = false;
    try {
        // make sure that it reads everything first before moving on 
        const files = fs.readdirSync(dirPath);

        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const fileName = path.basename(filePath);
            const fileContent = fs.readFileSync(filePath, "utf8");
            const parsedRestaurant = JSON.parse(fileContent);
            if (parsedRestaurant.id == req.params.id) {
                // Update changes to file
                fs.writeFileSync(path.join(dirPath, fileName), JSON.stringify(req.body.restaurant), "utf8");

                // Load all restaurants again to be used by client
                getAllRestaurants("restaurants");
                found = true;
            }
        });

        if (found) {
            res.json({ msg: "Changes Saved" });
        } else {
            res.status(404).json({ msg: "404 Restaurant Not Found !!" });
        }
    } catch (err) {
        console.error(`Error: Unable to scan the directory due to ${err}`);
    }
});

// this is getting the add restaurant form 
app.get("/addrestaurant", (req, res) => {
    res.render("pages/addrestaurant", {});
});

// saving all the details to the server
app.post("/restaurants", (req, res) => {
    try {
        console.log(req.body);
        const { name, delivery_fee, min_order } = req.body;
        let id = uuid.v4();

        // Get ids of existing restaurants to check if the id already exists
        const rests = Object.values(restaurants);
        for (let rest of rests) {
            // If id already exists, generate a new one, else use the one generated previously.
            if (id == rest.id) {
                id = uuid.v4();
            }
        }

        if (name && delivery_fee && min_order) {
            const restaurant = {
                id: id,
                name: name.trim(),
                delivery_fee: delivery_fee,
                min_order: min_order
            };
            const filename = restaurant.name.split(" ").join("").trim();
            const file = fs.writeFileSync(`./restaurants/${filename}.json`, JSON.stringify(restaurant));

            getAllRestaurants("restaurants");

            res.json({ restaurant });

        }
    } catch (err) {
        console.error(`Error: While saving the new restaurant ${err}`);
    }
});


//Helper function to read all json files from restaurant dir
// this is called when the server starts, populates it with the restaurant details 
function getAllRestaurants(dir) {
    const restaurant_txt = path.join(__dirname, "restaurant.txt");
    if (fs.existsSync(restaurant_txt)) {
        fs.unlinkSync(restaurant_txt);
    }
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
        fs.writeFileSync(restaurant_txt, JSON.stringify(restaurants), "utf8");
    } catch (err) {
        console.error(`Error: Unable to scan the directory due to ${err}`);
    }
}

app.listen(3000, () => {
    console.log("server listening at http://localhost:3000");
    getAllRestaurants("restaurants");
});