

function init(){
	document.getElementById("submit").onclick = submitProduct;
}

function submitProduct(){
	let name = document.getElementById("name").value;
	let price = document.getElementById("price").value;
	
	if(name.length > 0 && price.length > 0){
		let newItem = {name, price};
		
		let req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			
		}
		req.open("POST", "http://localhost:3000/products");
		req.send(JSON.stringify(newItem));
	}else{
		alert("You have to enter a name and price");
	}
	
}