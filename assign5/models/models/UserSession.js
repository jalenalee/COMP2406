const mongoose = require("mongoose");

const UserSessionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("UserSession", UserSessionSchema);