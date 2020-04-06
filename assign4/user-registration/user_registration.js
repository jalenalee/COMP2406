const express = require("express");
const bodyParser = require("body-parser");

// taken from the lecture notes 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3000');
const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
    console.log("connection succeeded");
})

var app = express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/register', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    var data = {
        "username": username,
        "password": password
    }
    db.collection('details').insertOne(data, function(err, collection) {
        if (err) throw err;
        console.log("User successfully created");

    });

    return res.redirect('user.html'); // this isn't right but i'm not sure how to redirect to the user_id page (essentially the user_profile page)
})

console.log("server listening at port 3000");