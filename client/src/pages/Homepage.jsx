import React, { useContext, useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import TopRecipes from "../components/recipe/TopRecipes"
import Transition from "../components/Transition"
import PopularRecipe from "../components/PopularRecipe"
import MostLiked from "../components/MostLiked"

const Homepage = () => {
  const [data, setData] = useState([])

  //this will change later
  const getTopRecipes = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/recipe/all-recipes`
      )
      const data = await response.json()
      if (data.success) {
        setData(data.recipes.slice(2, 5))
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log("Error getting recipes", error)
    }
  }

  useEffect(() => {
    // const topThreeRecipes = popularRecipesData.slice(0, 3)
    // setData(topThreeRecipes)
    getTopRecipes()
  }, [])

  return (
    <div>
      <Navbar />

      {/* Landing Image */}
      <div className="">
        <img
          className="max-h-screen w-full -z-10 object-cover"
          src="/images/landingImage.jpg"
          alt="Landing"
        />
      </div>

      <div className="flex flex-col gap-10 items-center w-3/4 mx-auto">
        {/* Top Recipes Section */}
        <div className="mt-10 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-5">
            <div className="flex items-center mb-8 lg:mb-0">
              <div className="w-5 h-12 bg-primary"></div>
              <p className="ml-4 font-bold text-2xl">
                Discover the top recipes <br /> available at us
              </p>
            </div>
            <p className="text-sm text-secondary max-w-lg text-center lg:text-left">
              Our recipes are curated by top chefs and food experts. We have a
              wide range of recipes from different cuisines. You can also create
              your own meal plan and get the ingredients delivered to your
              doorstep.
            </p>
          </div>

          {/* Top Recipes Cards */}
          <div className="flex flex-wrap justify-between">
            {data.map((recipe, index) => (
              <Transition key={index}>
                <TopRecipes
                  title={recipe.title}
                  description={recipe.summary}
                  image={recipe.image}
                  slug={recipe.slug}
                />
              </Transition>
            ))}
          </div>
        </div>

        {/* Popular Recipes */}
        <PopularRecipe />

        {/* most liked  */}
        <MostLiked />
      </div>

      <Footer />
    </div>
  )
}

export default Homepage
