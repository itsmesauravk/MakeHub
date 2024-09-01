const express = require('express');
const router = express.Router();

const uploader = require('../Utils/multer');

const {createRecipe,getRecipes,getRecipeForUser, getRecipeFromSlug} = require('../controllers/Recipe/index');


//routes
router.post('/create-recipe', uploader.single('image'), createRecipe);


//get all recipes
router.get('/all-recipes', getRecipes)

// dynamic multiple routes for get recipes
router.get('/get-recipes/:userId', getRecipeForUser);

// from slug - single recipe
router.get('/get-single-recipe/:slug', getRecipeFromSlug)


module.exports = router;