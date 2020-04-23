const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Card = require("./models/Card.js");
const db = require("./db.js");

//Connecting to MongoDB
db();

// Initialize express
const app = express();
app.use(express.json());
app.use(express.static("public"));

// adds ejs into our express app 
app.set('view engine', 'ejs');
app.set("views", "./views");

// Get / homepage
app.get("/", (req, res) => {
    if (req.headers["content-type"] == "application/json"){
    return res.status(200).json({msg: "Welcome to Login page"});
}
    else {
        res.render("pages/home", {});
    }
})

// Get user profile
app.get("/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    try{
        const user = await User.findOne({_id: userId}).select("-password");
        if (user){
            if (req.headers["content-type"] == "application/json"){
                return res.status(200).json({user: user});
            }
                else {
                    res.render("pages/user", {user: user});
                }
        }
        else {
            return res.status(404).json({msg: "404 - User Not Found"});
        }
    }
    catch(error){
        return res.status(404).json({msg: "404 - User Not Found"});
    }
});

// Show Trade Details
app.post("/showtradedetails/:username/:friend", async (req, res) => {
    try{
        const friendName = req.params.friend;
        const username = req.params.username;

        let user = await User.findOne({username: username}).select("-password");
        if (user)
        {
            // userDetails = (userDetails);
            console.log(user);
            const incoming_trade_request = user.incoming_trade_requests.filter(request => request.from_friend == friendName);

            if (incoming_trade_request.length > 0){
                console.log("Sending Trade Details: " + incoming_trade_request[0]);
            return res.status(200).json({tradeDetails: incoming_trade_request[0]});
            }
            else{
            return res.status(404).json({msg: "404 - Trade Doesn't Exist"});
        }
        }
            
        else {
            return res.status(404).json({msg: "404 - Trade Not Found"});
        }
        }
    catch(error){
        console.log(error);
        return res.status(404).json({msg: "Error Occurred while finding trade details"});
    }

});

// Get card info
app.get("/cards/:cardName", async (req, res) => {
    const cardName = req.params.cardName;
    try{
        const card = await Card.findOne({name: cardName});
        if (card){
            if (req.headers["content-type"] == "application/json"){
                return res.status(200).json({card: card});
            }
                else {
                    res.render("pages/card", {card: card});
                }
        }
        else {
            return res.status(404).json({msg: "404 - Card Not Found"});
        }
    }
    catch(error){
        return res.status(404).json({msg: "404 - Card Not Found"});
    }
});


// Get & send friend details
app.post("/users/:username/:friend", async (req, res) => {
    try{
        let friendName = req.params.friend;
        const username = req.params.username;
        // console.log(friendName);
        // console.log(req.body.username);
        if (username == req.body.username){
            let friend = await User.findOne({username: friendName}).select("-password");
            // console.log("Friend Found: " + friend);
            if (friend){
            // return res.render("pages/friend", {friendName: friend.username, friendCards: friend.cards});
            return res.status(200).json({friendName: friend.username, friendCards: friend.cards});
        }
            else 
            return res.status(404).json({msg: "404 - Friend Not Found"});
        }
        else {
            return res.status(404).json({msg: "404 - User Not Found"});
        }
    
    }
    catch(error){
        return res.status(404).json({msg: "Error Occurred while finding a user's cards"});
    }

});


// Confirm Trade Request
app.post("/confirmtrade/:from/:to", async (req, res) => {
    try{
        const from = req.params.from;
        const to = req.params.to;

        // console.log("from: " + from);
        // console.log("to: " + to);

        const reqFrom  = await User.findOne({username: from}).select("-password");
        const reqTo  = await User.findOne({username: to}).select("-password");

        // console.log("Request From: " + reqFrom);
        // console.log("Request To: " + reqTo);

        // let outgoing_trade_requests = {};
        // outgoing_trade_requests.user_cards = fromUser.cards;
        // outgoing_trade_requests.to_friend = to;
        // outgoing_trade_requests.friend_cards = toUser.cards;

        // reqFrom.outgoing_trade_requests.push(outgoing_trade_requests);


        // let incoming_trade_requests = {};
        // incoming_trade_requests.from_friend = from;
        // incoming_trade_requests.friend_cards = fromUser.cards;
        // incoming_trade_requests.user_cards = toUser.cards;

        // reqTo.incoming_trade_requests.push(incoming_trade_requests);
        console.log("Cards before Acceptor: " + reqFrom.cards);
        let incoming_trade_requests = reqFrom.incoming_trade_requests.filter(request => request.from_friend == to);
        for (let card of incoming_trade_requests[0].friend_cards){
        reqFrom.cards.push(card);
    }
        // console.log("Cards after Acceptor: " + reqFrom.cards);

        // Remove User Card(s) agreed for trade
        let removeCards = incoming_trade_requests[0].user_cards;
        removeCards = reqFrom.cards.filter(card => !removeCards.includes(card));
        reqFrom.cards = removeCards;
        // console.log(removeCards);
        // console.log("Cards after Acceptor: " + reqFrom.cards);


        // console.log("Cards before: " + reqFrom.cards.length);
        incoming_trade_requests = reqFrom.incoming_trade_requests.filter(request => request.from_friend != to);
        reqFrom.incoming_trade_requests = incoming_trade_requests;
        console.log("Cards after Acceptor: " + reqFrom.cards);


        console.log("Cards before: " + reqTo.cards);
        let outgoing_trade_requests = reqTo.outgoing_trade_requests.filter(request => request.to_friend == from);
        // reqTo.cards.push(outgoing_trade_requests[0].friend_cards);
        for (let card of outgoing_trade_requests[0].friend_cards){
            reqTo.cards.push(card);
        }

        // Remove Request Initiator's User Card(s) agreed for trade
        let removeTradeInitiatorCards = outgoing_trade_requests[0].user_cards;
        removeTradeInitiatorCards = reqTo.cards.filter(card => !removeTradeInitiatorCards.includes(card));
        reqTo.cards = removeTradeInitiatorCards;

        outgoing_trade_requests = reqTo.outgoing_trade_requests.filter(request => request.to_friend != from);
        reqTo.outgoing_trade_requests = outgoing_trade_requests;
        console.log("Cards After: " + reqTo.cards);

        await reqFrom.save();
        await reqTo.save();

        let user = {};
        user.user = reqFrom;

        // return res.status(200).json({msg: `Friend Request Sent from ${from} to ${to}`});

        return res.status(200).json({msg: `Trade Request Sent by ${to} Accepted by ${from}`, user, to: reqTo});

    }
    catch(error){
        console.log("Error occurred while sending trade request" + error);
        return res.status(500).json({msg: `Error occurred while accepting Trade Request by ${from}`});
    }
});


// Reject Trade Request
app.post("/rejecttrade/:from/:to", async (req, res) => {
    try{
        const from = req.params.from;
        const to = req.params.to;

        // console.log("from: " + from);
        // console.log("to: " + to);

        const reqFrom  = await User.findOne({username: from}).select("-password");
        const reqTo  = await User.findOne({username: to}).select("-password");

        // console.log("Request From: " + reqFrom);
        // console.log("Request To: " + reqTo);

        
        // let outgoing_trade_requests = {};
        // outgoing_trade_requests.user_cards = fromUser.cards;
        // outgoing_trade_requests.to_friend = to;
        // outgoing_trade_requests.friend_cards = toUser.cards;

        // reqFrom.outgoing_trade_requests.push(outgoing_trade_requests);


        // let incoming_trade_requests = {};
        // incoming_trade_requests.from_friend = from;
        // incoming_trade_requests.friend_cards = fromUser.cards;
        // incoming_trade_requests.user_cards = toUser.cards;

        console.log("Cards before reqFrom: " + reqFrom.cards);
        let incoming_trade_requests = reqFrom.incoming_trade_requests.filter(request => request.from_friend == to);
        // reqFrom.cards.push(incoming_trade_requests[0].user_cards);
        for (let card of incoming_trade_requests[0].user_cards){
            reqFrom.cards.push(card);
        }
        // console.log(reqFrom.cards);

        incoming_trade_requests = reqFrom.incoming_trade_requests.filter(request => request.from_friend != to);
        reqFrom.incoming_trade_requests = incoming_trade_requests;
        console.log("Cards After reqFrom: " + reqFrom.cards);

        console.log("Cards before reqTo: " + reqTo.cards);
        let outgoing_trade_requests = reqTo.outgoing_trade_requests.filter(request => request.to_friend == from);
        // reqTo.cards.push(outgoing_trade_requests[0].user_cards);
        for (let card of outgoing_trade_requests[0].user_cards){
            reqTo.cards.push(card);
        }

        outgoing_trade_requests = reqTo.outgoing_trade_requests.filter(request => request.to_friend != from);
        reqTo.outgoing_trade_requests = outgoing_trade_requests;
        console.log("Cards after reqTo: " + reqTo.cards);

        await reqFrom.save();
        await reqTo.save();

        let user = {};
        user.user = reqFrom;

        let to_user = {};
        to_user.user = reqTo;

        // return res.status(200).json({msg: `Friend Request Sent from ${from} to ${to}`});

        return res.status(200).json({msg: `Trade Request Sent by ${to} Rejected by ${from}`, user, to: to_user});

    }
    catch(error){
        console.log("Error occurred while sending friend request" + error);
        return res.status(500).json({msg: `Error occurred while rejecting Trade Request by ${to}`});
    }
});



// Send Trade Request
app.post("/proposeTrade", async (req, res) => {
    try{
        let fromUser = JSON.parse(JSON.stringify(req.body.fromUser));
        let toUser = JSON.parse(JSON.stringify(req.body.toUser));

        const from = fromUser.user;
        const to = toUser.user;

        // fromUser.cards.map(card => console.log(card));
      

        const reqFrom  = await User.findOne({username: from}).select("-password");
        const reqTo  = await User.findOne({username: to}).select("-password");


        // Check if trade between same users already exists.
        if (reqFrom.outgoing_trade_requests.find(request => request.to_friend == to)){
            return res.status(404).json({msg: `A Trade Request already exists between ${from} and ${to}`});
        }

        // console.log("Request From: " + reqFrom.username);
        // console.log("Request To: " + reqTo.username);

        reqFrom.cards = reqFrom.cards.filter(card =>  !fromUser.cards.includes(card));
        // console.log(reqFrom.cards);

        reqTo.cards = reqTo.cards.filter(card =>  !toUser.cards.includes(card));
        // console.log(reqTo.cards);

        let outgoing_trade_requests = {};
        outgoing_trade_requests.user_cards = fromUser.cards;
        outgoing_trade_requests.to_friend = to;
        outgoing_trade_requests.friend_cards = toUser.cards;

        reqFrom.outgoing_trade_requests.push(outgoing_trade_requests);


        let incoming_trade_requests = {};
        incoming_trade_requests.from_friend = from;
        incoming_trade_requests.friend_cards = fromUser.cards;
        incoming_trade_requests.user_cards = toUser.cards;

        reqTo.incoming_trade_requests.push(incoming_trade_requests);

        await reqFrom.save();
        await reqTo.save();

        let user = {};
        user.user = reqFrom;

        let to_user = {};
        to_user.user = reqTo;

        return res.status(200).json({msg: `Trade Request Sent from ${from} to ${to}`, user, to: to_user});

    }
    catch(error){
        console.log("Error occurred while sending friend request" + error);
    }
});


// Send Friend Request
app.post("/sendfriendreq/:from/:to", async (req, res) => {
    try{
        const from = req.params.from;
        const to = req.params.to;

        // console.log("from: " + from);
        // console.log("to: " + to);

        const reqFrom  = await User.findOne({username: from}).select("-password");
        const reqTo  = await User.findOne({username: to}).select("-password");

        // console.log("Request From: " + reqFrom.username);
        // console.log("Request To: " + reqTo.username);


        reqFrom.outgoing_friend_requests.push(to);
        reqTo.incoming_friend_requests.push(from);

        await reqFrom.save();
        await reqTo.save();

        let user = {};
        user.user = reqFrom;

        let touser = {};
        touser.user = reqTo;

        return res.status(200).json({msg: `Friend Request Sent from ${from} to ${to}`, user, to: touser});

    }
    catch(error){
        console.log("Error occurred while sending friend request" + error);
    }
});



// Confirm Friend Request
app.post("/confirm/:from/:to", async (req, res) => {
    try{
        const from = req.params.from;
        const to = req.params.to;

        // console.log("from: " + from);
        // console.log("to: " + to);

        const reqFrom  = await User.findOne({username: from}).select("-password");
        const reqTo  = await User.findOne({username: to}).select("-password");

        // console.log("Request From: " + reqFrom);
        // console.log("Request To: " + reqTo);

        let incoming_friend_requests = reqFrom.incoming_friend_requests.filter(request => request != to);
        reqFrom.incoming_friend_requests = incoming_friend_requests;
        reqFrom.friends.push(to);

        let outgoing_friend_requests = reqTo.outgoing_friend_requests.filter(request => request != from);
        reqTo.outgoing_friend_requests = outgoing_friend_requests;
        reqTo.friends.push(from);
        // reqFrom.outgoing_friend_requests.push(to);
        // reqTo.incoming_friend_requests.push(from);

        await reqFrom.save();
        await reqTo.save();

        let user = {};
        user.user = reqFrom;

        let toUser = {};
        toUser.user = reqTo;

        // return res.status(200).json({msg: `Friend Request Sent from ${from} to ${to}`});

        return res.status(200).json({msg: `Friend Request Sent by ${to} Accepted by ${from}`, user, to: toUser});

    }
    catch(error){
        console.log("Error occurred while sending friend request" + error);
        return res.status(500).json({msg: `Error occurred while accepting Friend Request by ${to}`});
    }
});


// Reject Friend Request
app.post("/reject/:from/:to", async (req, res) => {
    try{
        const from = req.params.from;
        const to = req.params.to;

        // console.log("from: " + from);
        // console.log("to: " + to);

        const reqFrom  = await User.findOne({username: from}).select("-password");
        const reqTo  = await User.findOne({username: to}).select("-password");

        // console.log("Request From: " + reqFrom);
        // console.log("Request To: " + reqTo);

        let incoming_friend_requests = reqFrom.incoming_friend_requests.filter(request => request != to);
        reqFrom.incoming_friend_requests = incoming_friend_requests;
        // console.log(reqFrom.incoming_friend_requests);
        // reqFrom.friends.push(to);

        let outgoing_friend_requests = reqTo.outgoing_friend_requests.filter(request => request != from);
        reqTo.outgoing_friend_requests = outgoing_friend_requests;
        // reqTo.friends.push(from);
        // reqFrom.outgoing_friend_requests.push(to);
        // reqTo.incoming_friend_requests.push(from);

        await reqFrom.save();
        await reqTo.save();

        let user = {};
        user.user = reqFrom;

        // return res.status(200).json({msg: `Friend Request Sent from ${from} to ${to}`});

        return res.status(200).json({msg: `Friend Request Sent by ${to} Rejected by ${from}`, user, to: reqTo});

    }
    catch(error){
        console.log("Error occurred while sending friend request" + error);
        return res.status(500).json({msg: `Error occurred while rejecting Friend Request by ${to}`});
    }
});


// Get Pending Friend Requests
app.get("/pendingfriends/:username", async (req, res) => {
    try{
        const username = req.params.username;
        // console.log("Pending Friend Requests for : " + username);

        const user = await User.findOne({username: username}).select("-password");
        if (user){
            return res.status(200).json({user});
        }
        else {
            return res.status(404).json({msg: "Can't find pending friend requests"});
        }
    }
    catch(error){
        return res.status(404).json({msg: "Internal Server Error. Can't find pending friend requests"});
    }

});


// Get Pending Trade Requests
app.get("/pendingtrades/:username", async (req, res) => {
    try{
        const username = req.params.username;
        // console.log("Pending Trade Requests for : " + username);

        const user = await User.findOne({username: username}).select("-password");
        if (user){
            return res.status(200).json({user});
        }
        else {
            return res.status(404).json({msg: "Can't find pending trade requests"});
        }
    }
    catch(error){
        return res.status(404).json({msg: "Internal Server Error. Can't find trade friend requests"});
    }

});


// Get All Friends
app.get("/showFriends/:username", async (req, res) => {
    try{
        const username = req.params.username;
        // console.log("Get all Friends for : " + username);

        const user = await User.findOne({username: username}).select("-password");
        if (user){
            return res.status(200).json({user});
        }
        else {
            return res.status(404).json({msg: "Can't find all friends"});
        }
    }
    catch(error){
        return res.status(404).json({msg: "Internal Server Error. Can't find friends"});
    }

});


// Get All Cards
app.get("/showCards/:username", async (req, res) => {
    try{
        const username = req.params.username;
        // console.log("Get all Cards for : " + username);

        const user = await User.findOne({username: username}).select("-password");
        if (user){
            return res.status(200).json({user});
        }
        else {
            return res.status(404).json({msg: "Can't find all Cards"});
        }
    }
    catch(error){
        return res.status(404).json({msg: "Internal Server Error. Can't find cards"});
    }

});


// Find people
app.post("/findUsers/:text", async (req, res) => {
    try{
        const username = JSON.parse(req.body.username);
        // console.log("User Searching: " + username);
        
        let users = await User.find({}).select("-password");
        let regex = new RegExp(`${req.params.text}`, "ig");
        users = users.filter(user => {
            // console.log(`${user.username == username}` + user.username == username);
            return user.username != username && user.username.match(regex);
        });
        if (users){
        // users = users.filter(user => {
        //     console.log(user.username != username);
        //     user.username != username} );
        return res.status(200).json({ users: users });
    }
        else 
        return res.status(404).json({msg: "No users found with that name !!"});
    }
    catch(error){
        return res.status(500).json({msg: `Internal Server Error occurred: ${error}`});
    }
});



//generate n random cards
function getNRandomCards(cards, n){
    let random_cards = [];
    for (let i = 0; i < n; i++){
        random_cards.push(cards[Math.ceil(Math.random() * 50)].name);
    }
    return random_cards;
}

// POST /register
app.post("/register", async (req, res) => {
    // console.log(req.body.username);
    try{
        // Check for existing user
        const username = req.body.username;
        let user = await User.findOne({username:username }).select("-password");
        if (user){
            return res.status(404).json({msg: `User ${username} already exits. Please use a different username`});
        }

        const password = req.body.password;

    // Register the user
        // Get Cards
        const cards = await Card.find({});
        // console.log(cards);
        const random_cards = getNRandomCards(cards, 10);
        // console.log("Random Cards Selected: " + random_cards.length);

        user = new User({username, password, cards: random_cards});
        user = await user.save();


    //  if (req.headers["content-type"] == "application/json"){
        return res.status(200).json({user});
    // }
        // else {
        //     res.render("pages/user", {user: user});
        // }
    }
    catch(error){
        return res.status(500).json({ msg: error});
    }
});

// POST /login
app.post("/login", async (req, res) => {
    // console.log(req.body.username);
    try{
        // Check for existing user
        const username = req.body.username;
        const password = req.body.password;

        let user = await User.findOne({username: username, password: password });
        if (!user){
            return res.status(404).json({ msg: "404 - User Not Found. Please enter the correct username & password"});
        }

    //  if (req.headers["content-type"] == "application/json"){

        //  console.log("Sending user to user profile API: " + user.username);
        return res.status(200).json({user: user});
    // }
        // else {
        //     console.log("Sending user to user profile Page: " + user.username);
        //     res.render("pages/user", {user: user});
        // }
    }
    catch(error){
        return res.status(500).json({ msg: error});
    }
});

app.post("/logout", async (req, res) => {
    try{
        // console.log("Logging Out: " + JSON.stringify(req.body.user));
        
        // Delete UserSession from UserSession collection
        // await UserSession.findOneAndRemove({ userId: req.body.id }, {
        //     useFindAndModify: false
        // });
    
        return res.status(200).json({msg: "User Logged Out !!"});
    }
    catch(error){
        return res.status(404).json({msg: `Error occurring while logging out`});
    }
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));