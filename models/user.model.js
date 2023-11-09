const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'teamMember'],
            default: 'teamMember'
        },
    }
)

const User = mongoose.model('User', userSchema)
module.exports = User;