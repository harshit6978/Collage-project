const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please provide email"],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        select: false,

    },
    confrimPassword: {
        type: String,
        required: true,
        minLength: 8,
        select: false,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
        },
        message: "Password are not match",
    },
    isVerified: {
        type: Boolean,
        default: false,
        select: false,
    },
    otp: {
        type: Number,
    },
    street: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    zipCode: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    profileImage: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);