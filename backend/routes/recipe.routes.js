const express = require('express');
const router = express.Router();

const uploader = require('../Utils/multer');

const {createRecipe,getRecipes,getRecipeForUser} = require('../controllers/Recipe/index');


//routes
router.post('/create-recipe', uploader.single('image'), createRecipe);

// dynamic multiple routes for get recipes
router.get('/get-recipes/:userId', getRecipeForUser);


module.exports = router;