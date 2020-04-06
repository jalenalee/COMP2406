const mongoose = require("mongoose");

// Connect DB
const db = async () => {
    try {
    const connection = await mongoose.connect("mongodb://localhost:27017/assign4", {
        useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true
    });
    console.log("MongoDB Connected !!");
}
catch(error){
    console.error(`Error ${error} while connecting to MongoDB. Exiting application`);
    process.exit(0);
}
}

module.exports = db;