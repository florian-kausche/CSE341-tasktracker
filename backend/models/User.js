const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String },
    githubId: { type: String, unique: true },
    role: { type: String, default: 'student' },
    username: String,
    thumbnail: String
});

module.exports = mongoose.model('User', userSchema); 