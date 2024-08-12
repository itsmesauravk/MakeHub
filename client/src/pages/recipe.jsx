import React, { useEffect, useState } from "react"

// import { Rating } from 'react-simple-star-rating'; // Add this if you want to use a rating component
import recipes from "../data/recipes.json"
import users from "../data/users.json"

import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import RecipePage from "../components/RecipePage"

const Recipe = () => {
  const [recipe, setRecipe] = useState(null) // Initial state is null
  const [loading, setLoading] = useState(true) // Add a loading state
  const [user, setUser] = useState(null)
  const { slug } = useParams()

  useEffect(() => {
    // Simulate fetching data with a delay
    const fetchRecipe = () => {
      const viewRecipe = recipes.find((recipe) => recipe.slug === slug)
      setRecipe(viewRecipe)
      setLoading(false) // Set loading to false once data is fetched
    }
    fetchRecipe()
  }, [slug])

  useEffect(() => {
    const fetchUser = () => {
      const user = users.find((user) => user.id === recipe.userId)
      setUser(user)
    }
    if (recipe) {
      fetchUser()
    }
  }, [recipe])

  if (loading) {
    return <div className="text-center p-4">Loading...</div> // Display loading state
  }

  if (!recipe) {
    return <div className="text-center p-4">Recipe not found</div> // Display error if recipe not found
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-10 items-center my-auto w-3/4 mx-auto mt-16">
        <RecipePage recipe={recipe} user={user} />
      </div>
      <Footer />
    </div>
  )
}

export default Recipe
