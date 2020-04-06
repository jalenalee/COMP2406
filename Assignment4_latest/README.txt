Jalena Lee 
# 101158770 

Design Decisions 
- this project was designed around the assignment specifications and leveraged the skills i learned in assignment 2 & 3 
- I choose to write all the XML requests directly into my ejs files so that I wouldn't have to create a separate file for the client side server 
- the ejs files were created for the separate views and done for code readability
- mongoose was used as the connector to the database 

Instructions 
1. Unzip the folder and open the files in your desired IDE 
3. Run npm install (be sure to run it in the SAME directory as the package.json file)
4. You can do npm run app to launch the server or you can run the server in dev mode (which means you can make changes to the code without starting and stopping your code constantly) using npm run dev 
5. To return all the usernames that match the search parameter, type in http://localhost:3000/users/?name= to the browser followed by what you want to search for 
    ex. http://localhost:3000/users/?name=t 
    - this would return all the users with t in their name 
6. To search order by order id, use http://localhost:3000/orders/:id 
    ex. http://localhost:3000/orders/5e867210d6065b8e659a034d
    - this would return the order with order id 5e867210d6065b8e659a034d