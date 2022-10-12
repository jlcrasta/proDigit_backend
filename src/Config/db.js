const mongoose = require("mongoose")

const db = process.env.DBURL

const connectDB = () => {
    mongoose.connect(db)
        .then(() => {
            console.log("connected to database")
        })
        .catch(e => {
            console.log(e)
            console.log("Database connection failed")
        })
}

module.exports = connectDB;