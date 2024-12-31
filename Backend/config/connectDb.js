const mongoose = require('mongoose');
require("dotenv").config();

const connectDb = async () => {
    try {
        const dbURL = process.env.MONGO_URI;
        const res = await mongoose.connect(dbURL);
        if (!res) {
            return console.log("Error");
        }
        return console.log("DB Connected");
    } catch (error) {
        return console.log("Error Connecting DB");
    }
};

module.exports = connectDb;
