const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "User"        
    },
    order: {
        restaurantID: {
                type: String
            },
            restaurantName: {
                type: String
            },
            item: {
                type: Array
            },
            quantity: {
                type: Array
            },
            subtotal: {
                type: String
            },
            tax: {
                type: String
            },
            deliveryFee: {
                type: String
            },
            total: {
                type: String
            }
        }
});

module.exports = mongoose.model("Order", OrderSchema);