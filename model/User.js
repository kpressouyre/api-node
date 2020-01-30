const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        max: 100
    },
    lastName: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        required: true,
        max: 250
    },
    password: {
        type: String,
        required: true,
        max: 100
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', userSchema);