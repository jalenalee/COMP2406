const mongoose = require("mongoose");

const db = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/a5", { useNewUrlParser: true, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
        console.log("MongoDB connected");
    }
    catch(err){
        console.error(`Error ${err} while connecting to MongoDB. Exiting application.`);
        process.exit(0);
    }
}

module.exports = db;