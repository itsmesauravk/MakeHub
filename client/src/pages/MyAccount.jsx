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

const MyAccount = () => {
  const [user, setUser] = useState({})
  const [value, setValue] = useState("1")
  const [myrecipe, setMyRecipe] = useState([])
  const [myliked, setMyLiked] = useState([])
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
    const myrecipe = recipes.filter((recipe) => recipe.userId === uid)
    setMyRecipe(myrecipe)
  }

  const getMyLiked = () => {
    const myliked = recipes.filter((recipe) => recipe.likes.includes(uid))
    setMyLiked(myliked)
  }

  const getMySaved = () => {
    const mysavedlist = recipes.filter((recipe) => recipe.saved.includes(uid))
    setMySaved(mysavedlist)
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
              src="/images/burger.jpg"
              alt="user-profile-image"
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
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-all">
                  Add Recipe
                </button>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <p>{user.recipesPosted?.length} recipes</p>
              <p>{user.following?.length} following</p>
              <p>{user.followers?.length} followers</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">{user.bio}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b-2 w-full mx-auto mt-5"></div>

        {/* Tabs Section */}
        <div className="w-full mt-2">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#F3043A",
                    },
                  }}
                >
                  <Tab
                    label="My Recipe"
                    value="1"
                    sx={{
                      color: "text.primary",
                      "&.Mui-selected": {
                        color: "#F3043A",
                      },
                    }}
                  />
                  <Tab
                    label="Liked"
                    value="2"
                    sx={{
                      color: "text.primary",
                      "&.Mui-selected": {
                        color: "#F3043A",
                      },
                    }}
                  />
                  <Tab
                    label="Saved"
                    value="3"
                    sx={{
                      color: "text.primary",
                      "&.Mui-selected": {
                        color: "#F3043A",
                      },
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className="container mx-auto flex flex-wrap gap-5 mt-10">
                  {myrecipe.map((recipe) => (
                    <RecipeCard key={recipe.id} recipeDetails={recipe} />
                  ))}
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="container mx-auto flex flex-wrap gap-5 mt-10">
                  {myliked.map((recipe) => (
                    <RecipeCard key={recipe.id} recipeDetails={recipe} />
                  ))}
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div className="container mx-auto flex flex-wrap gap-5 mt-10">
                  {mySaved.map((recipe) => (
                    <RecipeCard key={recipe.id} recipeDetails={recipe} />
                  ))}
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MyAccount
