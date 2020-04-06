const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/users.js");
const Order = require("./models/orders.js");
const UserSession = require("./models/usersession.js");
const app = express();
const db = require("./dbConnection.js");
// const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(express.static("public"));

// adds ejs into our express app 
app.set('view engine', 'ejs');
app.set("views", "./views");


db();

app.use(express.static("public"));

// const filePath = path.join(__dirname, "tokens");

app.get("/", (req, res) => {
    res.render('pages/index', {});
    // res.json({ msg: "Welcome to the Restaurants Page" });
});


app.get("/users", async(req, res) => {
    try {
        let queryString = req.query.name;
        console.log("Query String: " + queryString);
        let users = await User.find({}).select("-password");

        if (queryString) {
            console.log("Query String: " + queryString);
            let regex = new RegExp(`${queryString}`, "ig");
            users = users.filter(user => {
                return user.username.match(regex);
            });
        }

        users = users.filter(user => {
            return user.privacy == false;
        });

        if (req.headers["content-type"] == "application/json") {
            return res.status(200).json({ users: users });
        } else {
            return res.render("pages/users", { users });
        }
    } catch (error) {
        return res.status(500).json({ msg: `Internal Server Error occurred: ${error}` });
    }
});


app.get("/registeration", (req, res) => {
    res.render("pages/registeration", {});
});

app.get("/login", (req, res) => {
    res.render("pages/login", {});
});

app.post("/logout", async(req, res) => {
    try {
        console.log("Logging Out");
        // if (fs.existsSync(path.join(filePath, `${req.body.id}.txt`))){
        //     fs.unlinkSync(filePath + `/${req.body.id}.txt`);
        // }

        // Delete UserSession from UserSession collection
        await UserSession.findOneAndRemove({ userId: req.body.id }, {
            useFindAndModify: false
        });

        return res.status(200).json({ msg: "User Logged Out !!" });
    } catch (error) {
        return res.status(404).json({ msg: `Error occurring while logging out` });
    }
});


app.get("/orders", (req, res) => {
    return res.render("pages/orderform", {});
});


app.get("/orders/:orderID", async(req, res) => {
    try {
        const orderId = req.params.orderID;

        // console.log("Order ID: " + orderId);
        // Get Order for this orderID
        const order = await Order.findOne({ _id: orderId });
        if (order) {

            // Get User of this Order to check whether the user is private
            const user = await User.findOne({ _id: order.userId });

            // Get user in session
            const userSession = await UserSession.findOne({ userId: order.userId });
            console.log("User Session Found: " + userSession);

            // show order details if user is NOT private
            if (user && user.privacy == false) {
                if (req.headers["content-type"] == "application/json") {
                    return res.status(200).json({ msg: order, placedBy: user.username });
                } else {
                    return res.render("pages/orderdetails", { order, username: user.username });
                }
            }
            // If user is private, check if user is logged in & user ID matches logged-in user's ID
            else if (userSession && user && user.privacy == true) {
                if (req.headers["content-type"] == "application/json") {
                    console.log("Returning Data for Private User ");
                    return res.status(200).json({ msg: order, placedBy: user.username });
                } else {
                    return res.render("pages/orderdetails", { order, username: user.username });
                }
            } else {
                console.log(" Auth Denied....Order Not Found");
                return res.status(403).json({ msg: "404 - Order Not Found" });
            }
        } else {
            console.log("Order Not Found");
            return res.status(404).json({ msg: "404 - Order Not Found" });
        }
    } catch (error) {
        return res.status(500).json({ msg: `Internal Server Error while getting Order Details: ${error}` });
    }
});


app.post("/orders", async(req, res) => {
    try {
        let orderSchema = req.body.orderSchema;
        let order = new Order(orderSchema);
        console.log("Posting Order to DB for the user" + order);

        // Save results to DB
        await order.save();

        return res.status(200).json({ msg: `Order Saved Successfully. Order ID: #${order._id}` });
    } catch (error) {
        return res.status(500).json({ msg: `${error} while saving data to Datastore` });
    }
});


app.get("/users/:id", async(req, res) => {
    const userId = req.params.id;
    user = await User.findOne({ _id: userId }).select("-password");
    console.log("Users/Id: " + user.privacy);

    let orders = await Order.find({ userId: userId }).sort({ date: -1 });

    orders = orders ? orders : null;

    console.log(orders);

    if (user && user.privacy == false) {
        console.log(`Sending User ${user.username}: Privacy = False to User Profile`);
        if (req.headers["content-type"] == "application/json") {
            return res.status(200).json({ msg: user, orders });
        } else {
            return res.render("pages/userprofile", { user, orders });
        }
    } else if (user && user.privacy == true) {
        try {
            console.log(`Sending User ${user.username}: Privacy = True to User Profile`);
            console.log("File Path: " + path.join(filePath, `${user._id}.txt`));
            // Check token from file
            // const id = fs.readFileSync(path.join(filePath, `${user._id}.txt`), "utf8");

            // Get User from UserSession collection
            const userSession = await UserSession.findOne({ userId: user._id });
            console.log("User Session Found: " + userSession.userId);

            if (userSession) {

                if (userSession.userId == userId) {
                    if (req.headers["content-type"] == "application/json") {
                        return res.status(200).json({ msg: user, orders });
                    } else {
                        return res.render("pages/userprofile", { user, orders });
                    }
                } else {
                    return res.status(404).json({ msg: "404 - User Not Found" });
                }
            } else {
                return res.status(404).json({ msg: "404 - User Not Found" });
            }


        } catch (error) {
            return res.status(404).json({ msg: "404 - User Not Found" });
        }
    } else {
        return res.status(404).json({ msg: "404 - User doesn't exist" });
    }
});


app.put("/privacy", async(req, res) => {
    try {
        console.log("Request to change privacy Mode");
        const userId = req.body.userId;
        const privacy = req.body.privacy;
        console.log("User Privacy profile: " + userId + ": " + privacy);
        if (!userId) {
            return res.status(404).json({ msg: "404 - User not found" });
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, {
            $set: {
                privacy: privacy
            }
        }, {
            useFindAndModify: false,
            new: true
        });
        return res.status(200).json({ msg: "Privacy Mode saved" });
    } catch (error) {
        return res.status(500).json({ msg: `${error} occurred while saving Privacy Mode` });
    }
});


app.post("/users", async(req, res) => {
    console.log(req.body.username);
    try {
        const username = req.body.username;

        let user = await User.findOne({ username: username });
        if (user) {
            return res.status(404).json({ msg: `User ${username} already exits. Please use a different username` });
        }

        const password = req.body.password;

        user = new User({ username, password });
        user = await user.save();

        console.log(`User ${user._id} exits.. Logging in`);

        // Log token to a file to be used later
        // fs.writeFileSync(path.join(filePath, `${user._id}.txt`),`${user._id}`);
        // console.log("Token written to file");

        // Log token to UserSession
        const userSession = new UserSession({ userId: user._id });
        await userSession.save();

        return res.status(200).json({ msg: user });
    } catch (error) {
        return res.status(500).json({ msg: `Error ${error} occurred while saving the user` });
    }
});

app.post("/login", async(req, res) => {
    console.log(req.body.username);
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (user) {
            console.log(`User ${user._id} exits.. Logging in`);

            // Log token to a file to be used later
            // fs.writeFileSync(`${filePath}/${user._id}.txt`,`${user._id}`);
            // console.log("Token written to file");

            // Log token to UserSession
            const userSession = new UserSession({ userId: user._id });
            await userSession.save();
            console.log("User Session ID: " + userSession._id);

            return res.status(200).json({ msg: user });
            // return res.status(200).render("pages/userprofile", { user });
        } else {
            return res.status(404).json({ msg: "404 - User Not Found" });
        }
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server error while trying to POST /login " });
    }
})


app.listen(3000, async() => {
    try {
        console.log("Server running !! Clearing all existing sessions");
        // await UserSession.deleteMany({});
    } catch (error) {
        console.log("Error occurred while running the server");
    }
});