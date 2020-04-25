Jalena Lee 
#101158770

How to setup the system: 🛠
1. Unzip the folder and open the files in your desired IDE 
3. Run npm install (be sure to run it in the SAME directory as the package.json file)
4. Initialize the database with `node database-initializer.js`
5. You can do npm start to start the app and launch it in your http://localhost:3000/
6. Awesome! You're in 🥳

How to play the game: ⏯
1. Create a user (user 1) with a name and password 
2. Once you've registered your user, open another tab and make another user (user 2) so they have friends! 
3. Go into user 1's profile to search for user 2 and add them as a friend! 🔎
4. (user 2) Accept the friend request! 🤙
5. (user 1) Select cards you want to trade and choose user 2 from the 'Select a friend' dropdown menu and 
choose the cards you want from them (user 2) and propose trade! ⬇️
    Note: if you just sent a friend request, please reload the page before you propose a trade so you friend can 
    show up in the dropdown menu of friends you can trade with. 
6. (user 2) View 'Pending trades' and see the new trade request and press 'Accept' ✅
7. YAY! You have officially accepted a trade! Now you can log out and end your session 🤝

How to test some edge cases: 🤠
- SAME username: try to make a user with the same name!
- Mandatory password & username: make a user without a password and you will get a pop up error 

Design Decisions: 🧠
- I designed my the schemas in the models after the information provided in the database-initializer.js 
- There are arrays in the User model for the outgoing_friend_requests, outgoing_trade_requests, 
incoming_friend_requests, and incoming_trade_requests in order to keep track of which user has which friends, 
their associated trade statuses
- Security was something that I considered in my design when searching for friends and making sure that 
the user in the session had the friend they were searching for, in their array of friends  
- If any other user who isn't your friend tries to view your user profile using you ID, he/she won't be able to do so... 
He/She will be redirected to a page showing Unknown ID message.
- Each user model has 0 or many cards (in this case they have 10 cards because of the assignment 
specifications)

Some bonus features 🤩
- When you accept a friend request, it shows that you have a new friend to trade with 👫
- If you've already added a friend, it'll show that you are already friends in the button ☑️
- When you want to view your friend's cards, they show up on the SAME page instead of a different window
improving user experience 🃏
- All the user's operations are on a single page which was mentioned as a bonus feature in the demo video 📄
- If you click on the card, it will open a new window with the card's information! 

Final Notes: 
Hi! Thank you for taking the time to review my assignment, hope you enjoyed it! I just wantd to say that 
I worked really really hard on this and put many many hours into this and learned a lot and would love to 
end this course on a high note and ya :) 🥺 