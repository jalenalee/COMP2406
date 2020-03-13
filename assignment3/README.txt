Jalena Lee 
#101158770 

Design Decisions 
- this project was designed around the assignment specifications and leveraged the skills i learned in assignment 2 
- I choose to use ejs this time instead of pug since I used pug in my last assignment and absolutely hated it 
- I choose to write all the XML requests directly into my ejs files so that I wouldn't have to create a separate file for the client side server 
- the ejs files were created for the separate views and done for code readability

Instructions 
1. Unzip the folder and open the files in your desired IDE 
3. Run npm install (be sure to run it in the SAME directory as the package.json file)
4. You can do npm run app to launch the server or you can run the server in dev mode (which means you can make changes to the code without starting and stopping your code constantly) using npm run dev 
5. To test the json, you can run it on postman and once the server is up and running, you can paste the url for it 
6. For the POST and PUT requests in postman, you must use a request body. The following are template request body's that can be used: 

POST REQUEST 
{
    "name": "MyString",
    "delivery_fee": "4",
    "min_order": "1"
}

PUT REQUEST 
{
	"restaurant":{
	"id": "2",
	"name": "Test2 Restaurant",
	"delivery_fee": "28",
	"min_order": "5"}
}



