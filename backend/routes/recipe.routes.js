const express = require('express');
const router = express.Router();

const uploader = require('../Utils/multer');

const {createRecipe,getRecipes,getRecipeForUser, getRecipeFromSlug, getAllRecipes,
    createRating, likeRecipe,saveRecipe,
    search
} = require('../controllers/Recipe/index');


//routes
router.post('/create-recipe', uploader.single('image'), createRecipe);


//get all recipes
router.get('/all-recipes', getRecipes)

// dynamic multiple routes for get recipes
router.get('/get-recipes/:userId', getRecipeForUser);

// from slug - single recipe
router.get('/get-single-recipe/:slug', getRecipeFromSlug)

//filter recipes route (multiple)
router.get('/filter-recipes',getAllRecipes)

//create rating
router.post('/new-rating', createRating);


//like recipe
router.post('/like-recipe', likeRecipe);

//save recipe
router.post('/save-recipe', saveRecipe);

//search
router.get('/search', search);


module.exports = router;