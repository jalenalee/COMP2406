let aragorn = {
    name: "Aragorn's Orc BBQ", //The name of the restaurant
    min_order: 20, //The minimum order amount required to place an order
    delivery_charge: 5, //The delivery charge for this restaurant
    //The menu
    menu: {
        //First category
        "Appetizers": {
            //First item of this category
            0: {
                name: "Orc feet",
                description: "Seasoned and grilled over an open flame.",
                price: 5.50
            },
            1: {
                name: "Pickled Orc fingers",
                description: "Served with warm bread, 5 per order.",
                price: 4.00
            },
            2: {
                name: "Sauron's Lava Soup",
                description: "It's just really spicy water.",
                price: 7.50
            },
            3: {
                name: "Eowyn's (In)Famous Stew",
                description: "Bet you can't eat it all.",
                price: 0.50
            },
            4: {
                name: "The 9 rings of men.",
                description: "The finest of onion rings served with 9 different dipping sauces.",
                price: 14.50
            }
        },
        "Combos": {
            5: {
                name: "Buying the Farm",
                description: "An arm and a leg, a side of cheek meat, and a buttered biscuit.",
                price: 15.99
            },
            6: {
                name: "The Black Gate Box",
                description: "Lots of unidentified pieces. Serves 50.",
                price: 65.00
            },
            7: { //Thanks to M_Sabeyon
                name: "Mount Doom Roast Special with Side of Precious Onion Rings.",
                description: "Smeagol's favorite.",
                price: 15.75
            },
            8: { //Thanks Shar[TA]
                name: "Morgoth's Scorched Burgers with Chips",
                description: "Blackened beyond recognition.",
                price: 13.33

            },
            10: {
                name: "Slab of Lurtz Meat with Greens.",
                description: "Get it while supplies last.",
                price: 17.50
            },
            11: {
                name: "Rangers Field Feast.",
                description: "Is it chicken? Is it rabbit? Or...",
                price: 5.99
            }
        },
        "Drinks": {
            12: {
                name: "Orc's Blood Mead",
                description: "It's actually raspberries - Orc's blood would be gross.",
                price: 5.99
            },
            13: {
                name: "Gondorian Grenache",
                description: "A fine rose wine.",
                price: 7.99
            },
            14: {
                name: "Mordor Mourvedre",
                description: "A less-fine rose wine.",
                price: 5.99
            }
        }
    }
};

let legolas = {
    name: "Lembas by Legolas",
    min_order: 15,
    delivery_charge: 3.99,
    menu: {
        "Lembas": {
            0: {
                name: "Single",
                description: "One piece of lembas.",
                price: 3
            },
            1: {
                name: "Double",
                description: "Two pieces of lembas.",
                price: 5.50
            },
            2: {
                name: "Triple",
                description: "Three pieces, which should be more than enough.",
                price: 8.00
            }
        },
        "Combos": {
            3: {
                name: "Second Breakfast",
                description: "Two pieces of lembas with honey.",
                price: 7.50
            },
            4: {
                name: "There and Back Again",
                description: "All you need for a long journey - 6 pieces of lembas, salted pork, and a flagon of wine.",
                price: 25.99
            },
            5: {
                name: "Best Friends Forever",
                description: "Lembas and a heavy stout.",
                price: 6.60
            }
        }
    }
};

let frodo = {
    name: "Frodo's Flapjacks",
    min_order: 35,
    delivery_charge: 6,
    menu: {
        "Breakfast": {
            0: {
                name: "Hobbit Hash",
                description: "Five flapjacks, potatoes, leeks, garlic, cheese.",
                price: 9.00
            },
            1: {
                name: "The Full Flapjack Breakfast",
                description: "Eight flapjacks, two sausages, 3 eggs, 4 slices of bacon, beans, and a coffee.",
                price: 14.00
            },
            2: {
                name: "Southfarthing Slammer",
                description: "15 flapjacks and 2 pints of syrup.",
                price: 12.00
            }

        },
        "Second Breakfast": {
            3: {
                name: "Beorning Breakfast",
                description: "6 flapjacks smothers in honey.",
                price: 7.50
            },
            4: {
                name: "Shire Strawberry Special",
                description: "6 flapjacks and a hearty serving of strawberry jam.",
                price: 8
            },
            5: {
                name: "Buckland Blackberry Breakfast",
                description: "6 flapjacks covered in fresh blackberries. Served with a large side of sausage.",
                price: 14.99
            }
        },
        "Elevenses": {
            6: {
                name: "Lembas",
                description: "Three pieces of traditional Elvish Waybread",
                price: 7.70
            },
            7: {
                name: "Muffins of the Marish",
                description: "A variety of 8 different types of muffins, served with tea.",
                price: 9.00
            },
            8: {
                name: "Hasty Hobbit Hash",
                description: "Potatoes with onions and cheese. Served with coffee.",
                price: 5.00
            }
        },
        "Luncheon": {
            9: {
                name: "Shepherd's Pie",
                description: "A classic. Includes 3 pies.",
                price: 15.99
            },
            10: {
                name: "Roast Pork",
                description: "An entire pig slow-roasted over a fire.",
                price: 27.99
            },
            11: {
                name: "Fish and Chips",
                description: "Fish - fried. Chips - nice and crispy.",
                price: 5.99
            }
        },
        "Afternoon Tea": {
            12: {
                name: "Tea",
                description: "Served with sugar and cream.",
                price: 3
            },
            13: {
                name: "Coffee",
                description: "Served with sugar and cream.",
                price: 3.50
            },
            14: {
                name: "Cookies and Cream",
                description: "A dozen cookies served with a vat of cream.",
                price: 15.99
            },
            15: {
                name: "Mixed Berry Pie",
                description: "Fresh baked daily.",
                price: 7.00
            }
        },
        "Dinner": {
            16: {
                name: "Po-ta-to Platter",
                description: "Boiled. Mashed. Stuck in a stew.",
                price: 6
            },
            17: {
                name: "Bree and Apple",
                description: "One wheel of brie with slices of apple.",
                price: 7.99
            },
            18: {
                name: "Maggot's Mushroom Mashup",
                description: "It sounds disgusting, but its pretty good",
                price: 6.50
            },
            19: {
                name: "Fresh Baked Bread",
                description: "A whole loaf of the finest bread the Shire has to offer.",
                price: 6
            },
            20: {
                name: "Pint of Ale",
                description: "Yes, it comes in pints.",
                price: 5
            }
        },
        "Supper": {
            21: {
                name: "Sausage Sandwich",
                description: "Six whole sausages served on a loaf of bread. Covered in onions, mushrooms and gravy.",
                price: 15.99
            },
            22: {
                name: "Shire Supper",
                description: "End the day as you started it, with a dozen flapjacks, 5 eggs, 3 sausages, 7 pieces of bacon, and a pint of ale.",
                price: 37.99
            }
        }
    }
};

let restaurants = [aragorn, legolas, frodo];


// menuKeys.forEach(function(key) {
//     // To print out the categories 
//     document.getElementById("category").innerHTML = Object.keys(aragorn.menu)

//     let innerObject = Object.keys(aragorn.menu[key])


//     innerObject.forEach(function(object) {
//         document.getElementById("menu").innerHTML += aragorn.menu[key][object].name + "<br />"
//         document.getElementById("menu").innerHTML += aragorn.menu[key][object].description + "<br />"
//         document.getElementById("menu").innerHTML += "$" + aragorn.menu[key][object].price + "<br />" + "<br />"
//     })

// })


// Helper functions
const generateLinks = (elements) => {
    const ulist = document.createElement("ul");

    const category = document.getElementById("category");
    const menu = document.getElementById("menu");

    Object.keys(elements).forEach(element => {

        // Create div for each element
        let div = document.createElement("div");
        div.id = element;
        let keys = Object.values(elements[element]);
        let text = "";

        Object.values(elements[element]).forEach(key => {



            items = Object.values(key);
            // console.log("....." + items);
            // let item = items + "";

            let length = items.length
            let heading = items.slice(0, 1);
            let description = items.slice(1, length - 1);
            let price = items[length - 1];
            console.log(heading + "\n" + description + "\n" + price);


            div.innerHTML += heading + "<br/>";
            div.innerHTML += description + "<br/>";
            div.innerHTML += "$ " + price + "<br/>";

            div.innerHTML += "<br/><br/><br/>";

            // let vals = item.split(",");
            // console.log(vals);

            // vals.forEach(val => div.innerText += val);

            // div.innerHTML = document.createTextNode(item);
        });



        // let val = div.innerText.split("\n");

        // div.innerText = val;

        // Object.values(items).forEach(item => {
        //     div.innerHTML += item + "<br/>";
        // });

        div.innerHTML += "<br/><br/><br/><br/>";


        let values = Object.keys(keys).forEach(value => value.name);
        // console.log(keys);
        menu.appendChild(div);

        // Create anchor tags for each element
        let li = document.createElement("li");
        let anchor = document.createElement("a");
        anchor.textContent = element;
        anchor.setAttribute("href", `#${element}`);
        li.appendChild(anchor);
        ulist.appendChild(li);
    });

    category.appendChild(ulist);
}


const returnMenu = (restaurant) => {
    const arr = restaurants.filter(rest => rest.name == restaurant);
    // console.log(arr[0].menu);

    generateLinks(arr[0].menu);


}


// Event Functions
const changeRestaurant = (event) => {
    if (confirm("Are you sure you want to change the restaurant?")) {
        const restaurant = event.target.value;
        console.log("Change");
        console.log(restaurant);

        // Return menu of the selected restaurant
        returnMenu(restaurant);

    }
}



// Event Listeners
let selectRest = document.getElementById("drop-down");

selectRest.addEventListener("change", changeRestaurant);



// To make the dropdown menu 
let dropDown = document.getElementById("drop-down")
for (let i = 0; i < restaurants.length; i++) {
    let restaurant = document.createElement("option")
        // how to do it w/ innerText.html can i just like append it 
    restaurant.textContent = restaurants[i].name
    dropDown.appendChild(restaurant)
}

// confirmation button pop up 
function confirmAlert() {
    let notif = confirm("Are you sure you want to switch restaurants? ")
    if (notif == true) {
        // document.getElementById("menu").innerHTML

        let currentRestaurant = null;
        switch (document.getElementById("drop-down").value) {
            // place the BIG MENU KEYS CODE ADN PUT HERE 

            case restaurants[0].name:
                currentRestaurant = aragorn
                    // Gabbing the keys from the menu (categories)
                let menuKeys = Object.keys(aragorn.menu)

                menuKeys.forEach(function(key) {
                    // To print out the categories 
                    document.getElementById("category").innerHTML = Object.keys(aragorn.menu)

                    let innerObject = Object.keys(aragorn.menu[key])


                    innerObject.forEach(function(object) {
                        document.getElementById("menu").innerHTML += aragorn.menu[key][object].name + "<br />"
                        document.getElementById("menu").innerHTML += aragorn.menu[key][object].description + "<br />"
                        document.getElementById("menu").innerHTML += "$" + aragorn.menu[key][object].price + "<br />" + "<br />"
                    })

                })
                break
                // case restaurants[1].name:
                //     currentRestaurant = legolas
                //     let menuKeys = Object.keys(legolas.menu)
                //     menuKeys.forEach(function(key) {
                //         let innerObject = Object.keys(legolas.menu[key])
                //         innerObject.forEach(function(object) {
                //             document.getElementById("menu").innerHTML += legolas.menu[key][object].name
                //             document.getElementById("menu").innerHTML += legolas.menu[key][object].description
                //         })
                //     })
                //     break
                // case restaurants[2].name:
                //     currentRestaurant = frodo
                //     let menuKeys = Object.keys(frodo.menu)
                //     menuKeys.forEach(function(key) {
                //         let innerObject = Object.keys(frodo.menu[key])
                //         innerObject.forEach(function(object) {
                //             document.getElementById("menu").innerHTML += frodo.menu[key][object].name
                //             document.getElementById("menu").innerHTML += frodo.menu[key][object].description
                //         })
                //     })
                //     break


        }
    } else {
        // how to keep it on the same page when you click cancel 
        console.log('??')
    }
}