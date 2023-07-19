// This file defines the Mongoose schema and model for the User collection.

const mongoose = require('mongoose');
const { Schema } = mongoose;

// UserSchema, which specifies the structure and configuration for the user collection in MongoDB.
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    password: { 
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);