const Recipe = require('../../../models/recipe.models');
const User = require('../../../models/user.models');

const getRecipeFromSlug = async (req, res) => {
    try {
        const slug = req.params.slug;

        const recipe = await Recipe.findOne({ slug })
            .populate({
                path: 'userId',
                select: 'username email profilePicture'
            });

        if (!recipe) return res.status(404).json({ success: false, message: "Recipe Not Found" });

        res.status(200).json({ success: true, message: "Recipe Found Successfully", recipe });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = getRecipeFromSlug;
