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



// Helper functions
const generateLinks = (elements, delivery_charge) => {
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

            const childDiv = document.createElement("div");
            childDiv.className = "child";

            items = Object.values(key);


            let length = items.length
            let heading = items.slice(0, 1);
            let description = items.slice(1, length - 1);
            let price = items[length - 1];



            childDiv.innerHTML += heading + "<br/>";
            childDiv.innerHTML += description + "<br/>";
            childDiv.innerHTML += "$" + price + "<br/>";
            childDiv.innerHTML += `<input type="number" class="items" min="0">`;
            childDiv.innerHTML += `<input type="button" class="itemsBtn" value="Add">`;

            div.appendChild(childDiv);

            div.innerHTML += "<br/><br/><br/>";

        });


        div.innerHTML += "<br/><br/><br/><br/>";


        let values = Object.keys(keys).forEach(value => value.name);

        menu.appendChild(div);


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

    generateLinks(arr[0].menu);

    // Add to summary
    arr[0].delivery_charge;


}


// Event Functions
const changeRestaurant = (event) => {
    if (confirm("Are you sure you want to change the restaurant?")) {
        const restaurant = event.target.value;


        // Return menu of the selected restaurant
        returnMenu(restaurant);

    }
}

const getTotal = () => {
    let total = 0;
    const trs = document.querySelectorAll("tr");
    for (let tr of trs) {
        let price = parseFloat(tr.innerText.slice(tr.innerText.indexOf("(") + 1, tr.innerText.indexOf(")")));
        total += price;
    }

    return total;
}

const addToCart = (name, count, amount) => {

    const summary = document.getElementById("summary");

    let table = document.createElement("table");
    let tr = document.createElement("tr");
    tr.className = "trs";

    tr.innerHTML = `${name} X ${count} (${parseFloat(count) * parseFloat(amount.slice(1))})`;
    tr.innerHTML += `<a href="#" class="delete">Remove</a>`;
    table.appendChild(tr);

    summary.appendChild(table);

    total = getTotal();


    let span_total = document.getElementById("total");
    span_total.innerText = "Total: " + total;


}

const addMethod = e => {
    const input = e.target;
    if (input.classList.contains("itemsBtn")) {
        // const elements = Array.from(input.parentElement.children);
        const parent = input.parentElement;
        const children = Array.from(parent.childNodes);

        // for (let i = 0; i < input.children; i++){
        const name = children[0].nodeValue;
        const amount = children[4].nodeValue;
        const count = children[6].value;
        // }
        if (!isNaN(parseInt(count))) {

            addToCart(name, count, amount);
        }

    }
}

const removeEntry = (e) => {
    if (e.target.classList.contains("delete")) {

        let element = e.target;

        const total_entry = document.getElementById("total");
        let total = parseFloat(total_entry.innerText.slice(total_entry.innerText.indexOf(":") + 2));


        const current_value = element.previousSibling;
        let price = parseFloat(current_value.nodeValue.slice(current_value.nodeValue.indexOf("(") + 1, current_value.nodeValue.indexOf(")")));

        let net = total - price;


        element.parentElement.remove();

        let span_total = document.getElementById("total");
        span_total.innerText = "Total: " + net;
    }
}

let menuDiv = document.getElementById("menu");
menu.addEventListener("click", addMethod);

let summaryDiv = document.getElementById("summary");
summaryDiv.addEventListener("click", removeEntry);

// Event Listeners
let selectRest = document.getElementById("drop-down");

selectRest.addEventListener("change", changeRestaurant);




// To make the dropdown menu 
let dropDown = document.getElementById("drop-down")
for (let i = 0; i < restaurants.length; i++) {
    let restaurant = document.createElement("option")
    restaurant.textContent = restaurants[i].name
    dropDown.appendChild(restaurant)
}