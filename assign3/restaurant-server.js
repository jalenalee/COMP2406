const express = require('express');
const app = express();
const config = require("./config.json");

// adds pug into our express app 
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", home);
app.get("/add", )

function home(req, res, next) {
    res.render("pages/index", {});
}
app.listen(3000);
console.log("server listening at http://localhost:3000");