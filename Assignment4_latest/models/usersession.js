const mongoose = require("mongoose");

const UserSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("UserSchema", UserSessionSchema);