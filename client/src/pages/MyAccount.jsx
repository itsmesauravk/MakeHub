import React, { useContext, useEffect, useState } from "react"
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

import { LoginContext } from "../components/LoginContext"
import { Link } from "react-router-dom"

const MyAccount = () => {
  const [value, setValue] = useState("1")
  const [myRecipe, setMyRecipe] = useState([])
  const [myLiked, setMyLiked] = useState([])
  const [mySaved, setMySaved] = useState([])

  const { userBasicInfo } = useContext(LoginContext)

  const [userProfile, setUserProfile] = useState({})

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false)

  const handleOpenEditProfileModal = () => setIsEditProfileModalOpen(true)
  const handleCloseEditProfileModal = () => setIsEditProfileModalOpen(false)

  const handleOpenAddRecipeModal = () => setIsAddRecipeModalOpen(true)
  const handleCloseAddRecipeModal = () => setIsAddRecipeModalOpen(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  //getting user info
  const getUserProfile = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user-profile/${userBasicInfo.slug}`,
        {
          method: "GET",
        }
      )
      const data = await response.json()
      if (data.success) {
        setUserProfile(data.user)
      }
    } catch (error) {
      console.log("Error getting user profile", error)
    }
  }

  //for getting recipes (dynamic route)

  const getRecipes = async (type) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/recipe/get-recipes/${userBasicInfo._id}?type=${type}`,
        {
          method: "GET",
        }
      )
      const data = await response.json()
      if (data.success) {
        if (type === "my-recipes") {
          setMyRecipe(data.user.recipesPosted)
        } else if (type === "my-likes") {
          setMyLiked(data.user.myLikes)
        } else if (type === "my-saved") {
          setMySaved(data.user.mySaved)
        }
      } else {
        console.log("Error getting recipes")
      }
    } catch (error) {
      console.log("Error getting recipes", error)
    }
  }

  useEffect(() => {
    getUserProfile()

    // getMyRecipe()
    // getMyLiked()
    // getMySaved()
    getRecipes("my-recipes")
  }, [userBasicInfo.slug])

  console.log(userProfile)

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-10 items-center my-auto w-11/12 md:w-3/4 mx-auto mt-20">
        {userProfile && (
          // <div>
          <>
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              {/* Profile Image */}
              <div className="flex justify-center md:justify-start w-full md:w-1/4">
                <img
                  src={
                    userProfile?.profileImage ||
                    "https://freedesignfile.com/upload/2019/11/Professionals-cook-vector.jpg"
                  }
                  alt="user-profile"
                  className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover"
                />
              </div>
              {/* Profile Info */}
              <div className="flex flex-col w-full md:w-3/4">
                <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                  <h2 className="text-2xl font-semibold text-primary">
                    {userProfile?.fullname}
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

                    <Link
                      to={`/my-account/${userBasicInfo?.slug}/create-recipe`}
                    >
                      <button
                        onClick={handleOpenAddRecipeModal}
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-all"
                      >
                        Add Recipe
                      </button>
                    </Link>
                    {/* <AddRecipePage
                      isOpen={isAddRecipeModalOpen}
                      onClose={handleCloseAddRecipeModal}
                    /> */}
                  </div>
                </div>
                <div className="flex gap-4 mt-4 font-bold">
                  <p>
                    {userProfile?.recipesPosted?.length}{" "}
                    <strong>recipes</strong>
                  </p>
                  <p>
                    {userProfile?.following?.length} <strong>following</strong>
                  </p>
                  <p>
                    {userProfile?.followers?.length} <strong>followers</strong>
                  </p>
                </div>
                <p className="text-sm text-secondary mt-2">
                  {userProfile?.bio ? userProfile?.bio : "No bio available"}
                </p>
              </div>
            </div>

            {/* Tabs for Recipes, Liked, and Saved */}
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange} aria-label="user tabs">
                    <Tab
                      onClick={() => getRecipes("my-recipes")}
                      label="My Recipes"
                      value="1"
                    />
                    <Tab
                      onClick={() => getRecipes("my-likes")}
                      label="Liked Recipes"
                      value="2"
                    />
                    <Tab
                      onClick={() => getRecipes("my-saved")}
                      label="Saved Recipes"
                      value="3"
                    />
                  </TabList>
                </Box>

                <TabPanel value="1">
                  <div className="flex flex-wrap gap-6">
                    {myRecipe.length === 0 && (
                      <div className="w-full text-center text-lg text-secondary">
                        No recipes found, Try Adding Your First Recipe
                      </div>
                    )}
                    {myRecipe.length > 0 &&
                      myRecipe.map((recipe) => (
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
                    {myLiked.length === 0 && (
                      <div className="w-full text-center text-lg text-secondary">
                        No recipes found, Try Liking Some Recipes
                      </div>
                    )}

                    {myLiked.length > 0 &&
                      myLiked.map((recipe) => (
                        <RecipeCard
                          key={recipe.recipeId}
                          recipeDetails={recipe}
                        />
                      ))}
                  </div>
                </TabPanel>

                <TabPanel value="3">
                  <div className="flex flex-wrap gap-6">
                    {mySaved.length === 0 && (
                      <div className="w-full text-center text-lg text-secondary">
                        No recipes found, Try Saving Some Recipes
                      </div>
                    )}

                    {mySaved.length > 0 &&
                      mySaved.map((recipe) => (
                        <RecipeCard
                          key={recipe.recipeId}
                          recipeDetails={recipe}
                        />
                      ))}
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default MyAccount
