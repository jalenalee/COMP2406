let restaurants = {};

let currentRestaurant = {};

function init() {
    // creating new HTTPRequest 
    const xhr = new XMLHttpRequest();
    xhr.open("GET", restFile, true);
    // xhr.setRequestHeader("Content-type", "text/plain");
    xhr.onload = function() {
        // if success 
        if (xhr.status === 200) {
            console.log("Init called");
            // turn the information from server into object 
            restaurants = JSON.parse(xhr.responseText);
            document.getElementById("restaurant-select").innerHTML = genDropDownList(restaurants);

            //The drop-down menu
            let select = document.getElementById("restaurant-select");
            select.setAttribute("onchange", "selectRestaurant(event)");
        }
    }
    xhr.send();
}

function addRestaurant() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/addrestaurant', true);
    // do i need to do this? 
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
        }
    }

    // send the form information (what do i write here)
    xhr.send("foo=bar&lorem=ipsum");
}