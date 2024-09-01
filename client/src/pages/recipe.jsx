import React, { useEffect, useState } from "react"

// import { Rating } from 'react-simple-star-rating'; // Add this if you want to use a rating component

import users from "../data/users.json"

import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import RecipePage from "../components/RecipePage"
import FetchErrorPage from "../components/FetchErrorPage"

const Recipe = () => {
  const [recipe, setRecipe] = useState(null) // Initial state is null

  const [user, setUser] = useState(null)
  const [fetchError, setFetchError] = useState(false)
  const { slug } = useParams()

  const getRecipeFromSlug = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/recipe/get-single-recipe/${slug}`
      )
      const data = await response.json()
      if (data.success) {
        setRecipe(data.recipe)
        setUser(data.recipe.userId)
        setFetchError(false)
      } else {
        console.log(data.message)
        setFetchError(true)
      }
    } catch (error) {
      console.log("Somthing went wrong, Try again", error)
      setFetchError(true)
    }
  }

  useEffect(() => {
    getRecipeFromSlug()
  }, [slug])

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-10 items-center my-auto w-3/4 mx-auto mt-16">
        {fetchError ? (
          <FetchErrorPage />
        ) : (
          <RecipePage recipe={recipe} user={user} />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Recipe
