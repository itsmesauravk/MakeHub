const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 3
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    summary:{
        type: String,
        required: true,
        minlength: 10
    },
    description:{
        type: String,
        required: true,
        minlength: 10
    },
    image:{
        type: String,
        default: ''
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    ingredients:[{
        type: String,
        required: true
    }],
    method:[{
        type: String,
        required: true
    }],
    categories:[{
        type: String,
        required: true
    }],
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    saved:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    views:{
        type: Number,
        default: 0
    },
    

}, {timestamps: true});


const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;