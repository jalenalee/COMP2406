let div = document.getElementById("potato")
let p = document.createElement("p")
p.innerText = "Test"

// make sure this si the function, this will if you click on test, an alert will pop up
p.onclick = function() { displayAlert("test") }


div.appendChild(p);

function displayAlert(content) {
    alert(content)
}

// This is the dropdown and this is how to dynamically populate it 
let drop = document.getElementById("dropdown")
let k = document.createElement("option")
let l = document.createElement("option")

k.innerText = "Ketchup"
l.innerText = "Mustard"

drop.appendChild(k)
drop.appendChild(l)
drop.onchange = function() {
    console.log(drop.value)

}

let img = document.createElement("img")
img.src = "pictures/add.jpg"
div.appendChild(img)