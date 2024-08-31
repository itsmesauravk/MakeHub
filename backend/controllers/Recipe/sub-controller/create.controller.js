const Recipe = require('../../../models/recipe.models')
const User = require('../../../models/user.models')
const slug = require('slug')
const { uploadFile } = require('../../../Utils/fileUpload')

//create
const createRecipe = async (req, res) => {
  try {
    
    const { title, summary, description, type, categories, methods, ingredients,userId } = req.body
    const image = req.file.path



    


    // Check if the title already exists
    const validateTitle = await Recipe.findOne({ title })

    if (validateTitle) {
      return res.status(400).json({ success: false, message: "Title Already Exists" })
    }

    // Create slug from the title
    const slugTitle = slug(title)

    // Upload image
    const uploadImage = await uploadFile(image, "recipe-images")

    if (!uploadImage) {
      return res.status(400).json({ success: false, message: "Error uploading image" })
    }

    // Create recipe
    const newRecipe = new Recipe({
      title,
      slug: slugTitle,
      summary,
      description,
      image: uploadImage.secure_url,
      imageId: uploadImage.public_id,
      userId,
        type,
      ingredients,
      method:methods,
      categories,
    })

    const recipe = await newRecipe.save()

    if (!recipe) {
      return res.status(400).json({ success: false, message: "Error creating recipe" })
    }

    //updating user profile
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" })
    }
    
    user.recipesPosted.push(recipe._id)
    await user.save()


    return res.status(200).json({ success: true, message: "Recipe created successfully", recipe })
  } catch (error) {
    console.log("Error on createRecipe", error)
    return res.status(500).json({ success: false, message: "Internal server error" })
  }
}

module.exports = createRecipe
