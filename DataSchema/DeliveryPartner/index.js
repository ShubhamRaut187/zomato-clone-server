const mongoose = require('mongoose');

const deliveryPartnerSchema = mongoose.Schema({
    name: {
        type: String,
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
    documents: {
        type: Object,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    customerRatings: {
        type: Number,
        required: true,
    },
    vehicleDetails: {
        type: Object,
        required: true,
    },
    birthDate: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: String,
        required: true,
    },
    thirdPartyAgency: {
        type: Object,
        default: null,
    },
    avatar: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'delivery-partner'
    },
    availability: {
        type: Object,
        required: true,
    }
}); 

const deliveryPartnerModel = mongoose.model('deliveryPartners', deliveryPartnerSchema);

module.exports = {
    deliveryPartnerModel,
}