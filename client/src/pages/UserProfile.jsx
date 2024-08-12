import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import users from "../data/users.json"
import recipes from "../data/recipes.json"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import toast from "react-hot-toast"
import RecipeCard from "../components/recipe/cards"

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [userRecipes, setUserRecipes] = useState([])

  const location = useLocation()

  const getUid = () => {
    return new URLSearchParams(location.search).get("uid")
  }

  const uid = getUid()

  const getUser = () => {
    const user = users.find((user) => user.id === parseInt(uid))
    setUserProfile(user)
  }

  const getUserRecipes = () => {
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.userId === parseInt(uid)
    )
    setUserRecipes(filteredRecipes)
  }

  useEffect(() => {
    if (uid) {
      getUser()
      getUserRecipes()
    }
  }, [uid])

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-10 items-center my-auto w-3/4 mx-auto mt-20">
        {/* User Profile Section */}
        {userProfile && (
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-start  w-full">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={userProfile.profileImage}
                alt={userProfile.username}
                className="w-48 h-48 object-cover rounded-full border-4 border-primary"
              />
            </div>

            {/* Profile Details */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-bold text-primary mb-2">
                {userProfile.username}
              </h2>
              <p className="text-gray-600 mb-4">{userProfile.email}</p>
              <p className="text-gray-800 mb-6 ">{userProfile.bio}</p>

              <div className="flex justify-around md:justify-start gap-8 mb-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Followers
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {userProfile.followers.length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Following
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {userProfile.following.length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700">Recipes</p>
                  <p className="text-2xl font-bold text-primary">
                    {userProfile.recipesPosted.length}
                  </p>
                </div>
              </div>

              <button
                className="w-full md:w-auto bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-dark transition-colors"
                onClick={() => toast.success("Followed!")}
              >
                Follow
              </button>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-300 w-full"></div>

        {/* User Recipes Section */}
        <div className="w-full">
          <h2 className="text-3xl font-semibold text-primary mb-6">
            {userProfile?.username}'s Recipes
          </h2>
          {userRecipes.length === 0 && (
            <p className="text-center text-gray-600">
              {userProfile?.username} has not posted any recipes yet.
            </p>
          )}

          <div className="container mx-auto flex flex-wrap  gap-4">
            {userRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipeDetails={recipe} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserProfile
