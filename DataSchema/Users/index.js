const mongoose = require('mongoose');

// Defining user schema for the user
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    mobilePrimary: {
        type: String,
        unique: true,
    },
    mobileSecondary: {
        type: String,
        unique: true,
    },
    address: {
        type: Object,
    },
    paymentOption: {
        type: Object,
    }
});

// Creating a data model based on userSchema
const userModel = mongoose.model('users', userSchema);

module.exports = {
    userModel,
};