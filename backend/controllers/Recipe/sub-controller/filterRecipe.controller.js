const Recipe = require('../../../models/recipe.models')
const User = require('../../../models/user.models')


const getAllRecipes = async (req, res) => {
    try {
      const { page = 1, limit = 8, type='all', category='all',  sort='newest' } = req.query;

     
  
      const query = {};
  
      // Filtering by type
      if (type && type !== 'all') {
        query.type = type;
      }
  
      // Filtering by category
      if (category && category !== 'all') {
        query.categories = { $in: [category.toLowerCase()] };
      }
  
   
  
      // Sorting
      let sortOption = {};
      if (sort) {
        if (sort === 'popular') {
          sortOption = { views: -1 };
        } else if (sort === 'newest') {
          sortOption = { createdAt: -1 };
        } else if (sort === 'oldest') {
            sortOption = { createdAt: 1 };
        }else if (sort === 'high-low') {
          sortOption = { likes: -1 };
        }else if (sort === 'low-high') {
            sortOption = { likes: 1 };
          }
      }
  
      // Pagination
      const recipes = await Recipe.find(query)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const total = await Recipe.countDocuments(query);
  
      res.status(200).json({
        success: true,
        message: 'Recipes fetched successfully',
        data: recipes,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      });
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };
  
  module.exports = getAllRecipes;