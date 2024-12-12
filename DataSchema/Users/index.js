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
    },
    role: {
        type: String,
        default: 'general-user'
    },
    status: {
        type: [],
        default: [],
    },
});

// Status: true ---- User is unblocked and active.
// Status: false ---- User is blocked and not-active.

// Creating a data model based on userSchema
const userModel = mongoose.model('users', userSchema);

module.exports = {
    userModel,
};