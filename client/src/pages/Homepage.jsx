import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import TopRecipes from "../components/recipe/TopRecipes"
import Transition from "../components/Transition"
import PopularRecipe from "../components/PopularRecipe"
import popularRecipesData from "../data/recipes.json"

const Homepage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const topThreeRecipes = popularRecipesData.slice(0, 3)
    setData(topThreeRecipes)
  }, [])

  return (
    <div>
      <Navbar />

      {/* Landing Image */}
      <div className="relative">
        <img
          className="max-h-screen w-full object-cover"
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
      </div>

      <Footer />
    </div>
  )
}

export default Homepage
