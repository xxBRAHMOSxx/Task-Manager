const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: string,
        required: true
    },
    password: {
        type: string,
        required: true
    },
    roles: [{
        type: string,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema);