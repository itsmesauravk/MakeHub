const createRecipe = require('./sub-controller/create.controller')
const {getRecipes,getRecipeForUser} = require('./sub-controller/get.controller')
const getRecipeFromSlug = require('./sub-controller/singlerecipe.controller')



module.exports = {
    createRecipe,
    getRecipes,
    getRecipeForUser,
    getRecipeFromSlug
}