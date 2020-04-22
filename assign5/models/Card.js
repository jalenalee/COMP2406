const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cardClass: {
        type: String,
        required: true
    },
    rarity: {
        type: String,
        required: true
    },
    attack: {
        type: Number,
        required: true
    },
    health: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Card", CardSchema);