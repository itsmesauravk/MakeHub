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

import toast from "react-hot-toast"

import { MdModeEdit } from "react-icons/md"
import EditProfile from "../components/EditProfile"
import AddRecipePage from "../components/AddRecipe"

const MyAccount = () => {
  const [user, setUser] = useState({})
  const [value, setValue] = useState("1")
  const [myRecipe, setMyRecipe] = useState([])
  const [myLiked, setMyLiked] = useState([])
  const [mySaved, setMySaved] = useState([])

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false)

  const handleOpenEditProfileModal = () => setIsEditProfileModalOpen(true)
  const handleCloseEditProfileModal = () => setIsEditProfileModalOpen(false)

  const handleOpenAddRecipeModal = () => setIsAddRecipeModalOpen(true)
  const handleCloseAddRecipeModal = () => setIsAddRecipeModalOpen(false)

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
    const mySaved = recipes.filter((recipe) => recipe.saved.includes(uid))
    setMySaved(mySaved)
  }

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
                <button
                  onClick={handleOpenEditProfileModal}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-all"
                >
                  Edit Profile
                </button>
                <EditProfile
                  isOpen={isEditProfileModalOpen}
                  onClose={handleCloseEditProfileModal}
                />

                <button
                  onClick={handleOpenAddRecipeModal}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-all"
                >
                  Add Recipe
                </button>
                <AddRecipePage
                  isOpen={isAddRecipeModalOpen}
                  onClose={handleCloseAddRecipeModal}
                />
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
                  <div key={recipe.recipeId} className="relative">
                    <RecipeCard recipeDetails={recipe} />
                    <button
                      className="absolute top-2 right-2 bg-white p-3 rounded-full shadow-md "
                      onClick={() => {
                        toast.success("Trying to Edit, Lad ?")
                      }}
                    >
                      <MdModeEdit className="text-primary hover:text-secondary" />
                    </button>
                  </div>
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
