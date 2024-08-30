const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    bio: {
        type: String,
        default: '',
        maxlength: 200
    },
    profilePicture: {
        type: String,
        default: null
    },
    recipesPosted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe',
        default: []
    }],
    myLikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe',
        default: []
    }],
    mySaved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe',
        default: []
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }]
}, {timestamps: true});


const User = mongoose.model('user', userSchema);

module.exports = User;
