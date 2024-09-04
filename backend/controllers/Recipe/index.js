const createRecipe = require('./sub-controller/create.controller')
const {getRecipes,getRecipeForUser} = require('./sub-controller/get.controller')
const getRecipeFromSlug = require('./sub-controller/singlerecipe.controller')
const getAllRecipes = require('./sub-controller/filterRecipe.controller')

const {createRating} = require('./sub-controller/rating.controller')

const {likeRecipe,saveRecipe} = require('./sub-controller/likesave.controller')

const search = require('./sub-controller/search.controller')
const basicStats = require('./sub-controller/basicstats.controller')

const {getNotifications, markAsRead} = require('./sub-controller/notification.controller')



module.exports = {
    createRecipe,
    getRecipes,
    getRecipeForUser,
    getRecipeFromSlug,
    getAllRecipes,
    createRating,
    likeRecipe,
    saveRecipe,
    search,
    basicStats,
    getNotifications,
    markAsRead
}