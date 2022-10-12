const mongoose = require("mongoose")

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"]
    },
    password: {
        type: String,
        required: [true, "Password required"]
    },
    mobile: {
        type: Number,
        unique: true,
        required: [true, "Mobile Required"]
    },
    email: {
        type: String,
        required: [true, "Email required"],
        trim: true,
        lowercase: true,
        unique: true,
    }
})

module.exports = mongoose.model("UserDetails", registerSchema)

