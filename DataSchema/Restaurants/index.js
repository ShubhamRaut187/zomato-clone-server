const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    restaurantName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['vegeterian', 'non-vegeterian'],
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bankAccountDetails: {
        type: Object,
        required: true,
    },
    taxDetails: {
        type: Object,
        required: true,
    },
    licenseDetails: {
        type: Object,
        required: true,
    },
    menu: {
        type: Object,
    },
    dinning: {
        type: Boolean,
        required: true,
        default: true,
    },
});

const restaurantModel = mongoose.model('restaurants', restaurantSchema);

module.exports = {
    restaurantModel,
};