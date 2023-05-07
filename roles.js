const mongoose = require('mongoose');
const { Schema } = mongoose;
const isEmail = require('validation');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter username']
    },
    email: {
        type: String,
        required: [true, 'Please Enter email'],
        validate: {
            validator: (value) => {
                return /\S+@\S+\.\S+/.test(value);
            },
            message: 'Invalid email address',
        },
        unique: [true, 'User with given email already registered!'],
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    },
});

const User = new mongoose.model('User', userSchema);

module.exports = User;