let items = [];

function init() {
    document.getElementById("additem").addEventListener("click", addItem);
    setInterval(refreshList, 5000);
}

function refreshList() {
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            items = JSON.parse(req.responseText).items;
            renderList();
        }
    }
    req.open("GET", `http://localhost:5500/list`);
    req.send();
}
//Creates a new item and calls function to send the item to the server
function addItem() {
    let itemName = document.getElementById("itemname").value;
    if (itemName.length == 0) {
        alert("You must enter an item name.");
        return;
    }
    sendNewItem({
        name: itemName
    });
}

function sendNewItem(newItem) {
    //Your code would go here.
    req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        console.log("ALSKDJFLAKJDLFJ");
        if (this.readyState == 4 && this.status == 200) {
            console.log("HELLO");
            newItem = JSON.stringify(newItem);
            refreshList();
        }
        // if(req.responseHeader("status-code")==200){
        //   refreshList();
        // }
    }
    req.open("POST", `http://localhost:5500/list`);
    req.send(JSON.stringify(newItem));
}
//Removes displayed list data and renders new list using contents of items
function renderList() {
    let list = document.getElementById("list");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    items.forEach(elem => {
        let newDiv = document.createElement("div");
        let newItem = document.createElement("input");
        newItem.type = "checkbox";
        newItem.value = elem.name;
        newItem.id = elem.name;
        let text = document.createTextNode(elem.name);
        newDiv.appendChild(newItem);
        newDiv.appendChild(text);
        list.appendChild(newDiv);
    });
}