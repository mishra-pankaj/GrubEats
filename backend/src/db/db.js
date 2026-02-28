const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect("mongodb://localhost:27017/GrabEats")
        .then(()=>{
            console.log("MongoDb Connected");

        })
        .catch((err)=>{
            console.log("MongoDb Connection Error: ", err);

        })
}

module.exports = connectDB;