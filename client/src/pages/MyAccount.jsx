import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import users from "../data/users.json"
import recipes from "../data/recipes.json"

import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import RecipeCard from "../components/recipe/cards"

import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import IconButton from "@mui/material/IconButton"

import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import { IoClose } from "react-icons/io5"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

const MyAccount = () => {
  const [user, setUser] = useState({})
  const [value, setValue] = useState("1")
  const [myRecipe, setMyRecipe] = useState([])
  const [myLiked, setMyLiked] = useState([])
  const [mySaved, setMySaved] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const uid = 1

  const getUser = () => {
    const user = users.find((user) => user.id === uid)
    setUser(user)
  }

  const getMyRecipe = () => {
    const myRecipe = recipes.filter((recipe) => recipe.userId === uid)
    setMyRecipe(myRecipe)
  }

  const getMyLiked = () => {
    const myLiked = recipes.filter((recipe) => recipe.likes.includes(uid))
    setMyLiked(myLiked)
  }

  const getMySaved = () => {
    const mySavedList = recipes.filter((recipe) => recipe.saved.includes(uid))
    setMySaved(mySavedList)
  }

  // For adding recipe
  const [open, setOpen] = useState(false)

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    summary: "",
    description: "",
    type: "vegetarian",
    ingredients: [""],
    method: [""],
    image: "",
    categories: [],
  })

  const [profileData, setProfileData] = useState({
    username: "",
    bio: "",
    profileImage: null, // Store the file instead of URL
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setProfileData((prev) => ({ ...prev, profileImage: file }))
  }

  const handleEditSubmit = () => {
    console.log(profileData)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setNewRecipe((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddIngredient = () => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }))
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...newRecipe.ingredients]
    newIngredients[index] = value
    setNewRecipe((prev) => ({ ...prev, ingredients: newIngredients }))
  }

  const handleAddMethodStep = () => {
    setNewRecipe((prev) => ({
      ...prev,
      method: [...prev.method, ""],
    }))
  }

  const handleMethodStepChange = (index, value) => {
    const newMethod = [...newRecipe.method]
    newMethod[index] = value
    setNewRecipe((prev) => ({ ...prev, method: newMethod }))
  }

  const handleCategoryChange = (e) => {
    const { value } = e.target
    setNewRecipe((prev) => ({
      ...prev,
      categories: typeof value === "string" ? value.split(",") : value,
    }))
  }

  const handleSubmit = () => {
    console.log("New Recipe Submitted: ", newRecipe)
    handleClose()
  }

  const types = [
    {
      value: "vegetarian",
      label: "Vegetarian",
    },
    {
      value: "non-vegetarian",
      label: "Non-Vegetarian",
    },
    {
      value: "alcoholic-drinks",
      label: "Alcoholic Drinks",
    },
    {
      value: "smoothies",
      label: "Smoothies",
    },
    {
      value: "juices",
      label: "Juices",
    },
    {
      value: "milkshakes",
      label: "Milkshakes",
    },
    {
      value: "coffee",
      label: "Coffee",
    },
    {
      value: "tea",
      label: "Tea",
    },
    {
      value: "mocktails",
      label: "Mocktails",
    },
  ]

  const categories = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"]

  useEffect(() => {
    getUser()
    getMyRecipe()
    getMyLiked()
    getMySaved()
  }, [uid])

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-10 items-center my-auto w-11/12 md:w-3/4 mx-auto mt-20">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 w-full">
          {/* Profile Image */}
          <div className="flex justify-center md:justify-start w-full md:w-1/4">
            <img
              src={user.profileImage}
              alt="user-profile"
              className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover"
            />
          </div>
          {/* Profile Info */}
          <div className="flex flex-col w-full md:w-3/4">
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <h2 className="text-2xl font-semibold text-primary">
                {user.username}
              </h2>
              <div className="flex gap-2">
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-all">
                  Edit Profile
                </button>
                <div>
                  {/* Add Recipe Dialog */}
                  <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="md"
                    fullWidth
                  >
                    <DialogTitle
                      sx={{ m: 0, p: 2 }}
                      id="customized-dialog-title"
                    >
                      Add Recipe
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <IoClose />
                    </IconButton>
                    <DialogContent dividers>{/* Form content */}</DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        sx={{ color: "#F3043A" }} // Primary color
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        sx={{
                          color: "#FFFFFF",
                          backgroundColor: "#F3043A", // Primary color
                          "&:hover": {
                            backgroundColor: "#c9032d", // Darker shade of primary color
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </DialogActions>
                  </BootstrapDialog>
                </div>

                {/* add recipe  */}
                <React.Fragment>
                  <Button
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-all"
                    onClick={handleClickOpen}
                  >
                    Add Recipe
                  </Button>
                  <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="md"
                    fullWidth
                  >
                    <DialogTitle
                      sx={{ m: 0, p: 2 }}
                      id="customized-dialog-title"
                    >
                      Add Recipe
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <IoClose />
                    </IconButton>
                    <DialogContent dividers>
                      <form className="flex flex-col gap-4">
                        <TextField
                          label="Title"
                          variant="standard"
                          name="title"
                          value={newRecipe.title}
                          onChange={handleInputChange}
                          fullWidth
                        />
                        <TextField
                          label="Summary"
                          variant="standard"
                          name="summary"
                          value={newRecipe.summary}
                          onChange={handleInputChange}
                          fullWidth
                        />
                        <TextField
                          label="Description"
                          variant="standard"
                          name="description"
                          multiline
                          rows={4}
                          value={newRecipe.description}
                          onChange={handleInputChange}
                          fullWidth
                        />
                        <TextField
                          select
                          label="Type"
                          name="type"
                          value={newRecipe.type}
                          onChange={handleInputChange}
                          helperText="Please select food type"
                          variant="standard"
                          fullWidth
                        >
                          {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <div>
                          <h4 className="text-md font-medium">Ingredients</h4>
                          {newRecipe.ingredients.map((ingredient, index) => (
                            <TextField
                              key={index}
                              label={`Ingredient ${index + 1}`}
                              variant="standard"
                              value={ingredient}
                              onChange={(e) =>
                                handleIngredientChange(index, e.target.value)
                              }
                              fullWidth
                              margin="dense"
                            />
                          ))}
                          <Button
                            variant="outlined"
                            onClick={handleAddIngredient}
                            sx={{ mt: 2 }}
                            style={{
                              color: "#F3043A", // Primary color
                              borderColor: "#F3043A", // Primary color
                            }}
                          >
                            Add Ingredient
                          </Button>
                        </div>
                        <div>
                          <h4 className="text-md font-medium">Method</h4>
                          {newRecipe.method.map((step, index) => (
                            <TextField
                              key={index}
                              label={`Step ${index + 1}`}
                              variant="standard"
                              value={step}
                              onChange={(e) =>
                                handleMethodStepChange(index, e.target.value)
                              }
                              fullWidth
                              margin="dense"
                            />
                          ))}
                          <Button
                            variant="outlined"
                            onClick={handleAddMethodStep}
                            sx={{ mt: 2 }}
                            style={{
                              color: "#F3043A", // Primary color
                              borderColor: "#F3043A", // Primary color
                            }}
                          >
                            Add Step
                          </Button>
                        </div>
                        <TextField
                          label="Image URL"
                          variant="standard"
                          name="image"
                          value={newRecipe.image}
                          onChange={handleInputChange}
                          fullWidth
                        />
                        <TextField
                          select
                          label="Categories"
                          name="categories"
                          value={newRecipe.categories}
                          onChange={handleCategoryChange}
                          helperText="Please select categories"
                          variant="standard"
                          fullWidth
                          SelectProps={{
                            multiple: true,
                          }}
                        >
                          {categories.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </form>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        sx={{ color: "#F3043A" }} // Primary color
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        sx={{
                          color: "#FFFFFF",
                          backgroundColor: "#F3043A", // Primary color
                          "&:hover": {
                            backgroundColor: "#c9032d", // Darker shade of primary color
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </DialogActions>
                  </BootstrapDialog>
                </React.Fragment>
              </div>
            </div>
            <div className="flex gap-4 mt-4 font-bold">
              <p>
                {user.recipesPosted?.length} <strong>recipes</strong>
              </p>
              <p>
                {user.following?.length} <strong>following</strong>
              </p>
              <p>
                {user.followers?.length} <strong>followers</strong>
              </p>
            </div>
            <p className="text-sm text-secondary mt-2">
              {user.bio ? user.bio : "No bio available"}
            </p>
          </div>
        </div>

        {/* Tabs for Recipes, Liked, and Saved */}
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="user tabs">
                <Tab label="My Recipes" value="1" />
                <Tab label="Liked Recipes" value="2" />
                <Tab label="Saved Recipes" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="flex flex-wrap gap-6">
                {myRecipe.map((recipe) => (
                  <RecipeCard key={recipe.recipeId} recipeDetails={recipe} />
                ))}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="flex flex-wrap gap-6">
                {myLiked.map((recipe) => (
                  <RecipeCard key={recipe.recipeId} recipeDetails={recipe} />
                ))}
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div className="flex flex-wrap gap-6">
                {mySaved.map((recipe) => (
                  <RecipeCard key={recipe.recipeId} recipeDetails={recipe} />
                ))}
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
      <Footer />
    </div>
  )
}

export default MyAccount
