const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends: {
        type: Array
    },
    cards: {
        type: Array
    },
    outgoing_friend_requests: {
        type: Array
    },
    incoming_friend_requests: {
        type: Array
    },
    outgoing_trade_requests: {
        type: Array
    },
    incoming_trade_requests: {
        type: Array
    }
});

module.exports = mongoose.model("User", UserSchema);