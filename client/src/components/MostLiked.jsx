import React, { useEffect, useState } from "react"
import recipes from "../data/recipes.json"
import RecipeCard from "./recipe/cards"

const MostLiked = () => {
  const [mostLiked, setMostLiked] = useState([])

  useEffect(() => {
    const popular = recipes.filter((recipe) => recipe.likes.length > 2)
    setMostLiked(popular)
  }, [])

  return (
    <div className="mt-5">
      <div className="container mx-auto mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center mb-8 lg:mb-0">
            <div className="sidebar w-5 h-12 bg-primary"></div>
            <p className="ml-4 font-bold text-2xl text-center lg:text-left">
              Most Liked
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-wrap  gap-4">
        {mostLiked.map((recipe) => (
          <RecipeCard key={recipe.id} recipeDetails={recipe} />
        ))}
      </div>
    </div>
  )
}

export default MostLiked
