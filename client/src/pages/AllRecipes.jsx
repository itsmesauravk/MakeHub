import React, { useEffect, useState } from "react"
import recipes from "../data/recipes.json"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import RecipeCard from "../components/recipe/cards"
import { Pagination } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"

const AllRecipes = () => {
  const [allRecipes, setAllRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const location = useLocation()
  const navigate = useNavigate()

  const getPage = () => {
    const pageParam = new URLSearchParams(location.search).get("page")
    return pageParam ? parseInt(pageParam) : 1
  }

  useEffect(() => {
    setPage(getPage())
  }, [location.search])

  const handlePageChange = (event, value) => {
    navigate(`?page=${value}`)
    setPage(value)
  }

  const getAllRecipes = () => {
    const recipesPerPage = 8
    const startIndex = (page - 1) * recipesPerPage
    const endIndex = startIndex + recipesPerPage
    const getRecipes = recipes.slice(startIndex, endIndex)
    setAllRecipes(getRecipes)
    setLoading(false)
  }

  useEffect(() => {
    getAllRecipes()
  }, [page])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  if (loading) {
    return <div className="text-center p-4">Loading...</div>
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-10 items-center  my-auto w-3/4 mx-auto mt-20">
        <div className="container mx-auto flex flex-wrap gap-5 mt-10">
          {allRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipeDetails={recipe} />
          ))}
        </div>
        <Pagination
          count={Math.ceil(recipes.length / 8)}
          page={page}
          onChange={handlePageChange}
          color="secondary"
        />
      </div>
      <Footer />
    </div>
  )
}

export default AllRecipes
