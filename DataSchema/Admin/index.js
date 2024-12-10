const mongoose = require('mongoose');

// Admin details
// restaurant-admin: Admin with permissisons to manage the restaurants (can only manage restaurant details).
// super-admin-system: Admin with compelete access and permissions to the system (can create general-admin-system and reataurant-admin).
// general-admin-system: Admin with partial access and permissions to the system (can only create restaurant-admin to manage there specific restaurant).

// Todo
// Think on sub admins for restaurants so there will be good bandwidth for restaurants to manage the profile on platform ----- Pending.

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['restaurant-admin', 'super-admin-system', 'general-admin-system'],
    },
    password: {
        type: String,
        required: true,
    },
    creator: {
        type: Object,
        required: true,
    },
    restaurant: {
        type: Object,
        default: null,
    },
    role: {
        type: String,
        default: 'admin',
    }
});

const adminModel = mongoose.model('admins', adminSchema);

module.exports = {
    adminModel
};
