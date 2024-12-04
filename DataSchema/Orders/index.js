const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customer: {
        type: Object,
        required: true,
    },
    restaurant: {
        type: Object,
        required: true,
    },
    paymentDetails: {
        type: Object,
        required: true,
    },
    deliveryPartner: {
        type: Object,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
    },
    orderItems: {
        type: Object,
        required: true,
    },
    cookingInstructions: {
        type: String,
        default: null,
    },
    deliveryInstruction: {
        type: String,
        default: null,
    },
    cutlery: {
        type: Boolean,
        default: false,
    },
    deliverPartnerReview: {
        type: Object,
    },
    restaurantReview: {
        type: Object,
    },
});

const orderModel = mongoose.model('orders', orderSchema);

module.exports = {
    orderModel,
};