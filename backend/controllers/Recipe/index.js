const createRecipe = require('./sub-controller/create.controller')
const {getRecipes,getRecipeForUser} = require('./sub-controller/get.controller')



module.exports = {
    createRecipe,
    getRecipes,
    getRecipeForUser
}