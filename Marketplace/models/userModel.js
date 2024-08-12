const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    fullName: { type: String, required: true },
    birthDate: { type: Date },
    gender: { type: String },
    profilePicture: { type: String },
    bio: { type: String },
    role: { 
        type: String, 
        enum: ['Vendedor', 'Cliente'], 
        required: true 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
