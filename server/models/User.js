const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: false,
    // },
    googleId: {
        type: String,
        required: false,
    },
    naverId: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
