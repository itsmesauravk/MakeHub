import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { FaSearch } from "react-icons/fa"

// Sample JSON data for users
const users = [
  {
    id: 1,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "JohnDoe",
    totalRecipes: 24,
    followers: 120,
    isFollowing: true,
  },
  {
    id: 2,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    username: "JaneSmith",
    totalRecipes: 15,
    followers: 89,
    isFollowing: false,
  },
  {
    id: 3,
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    username: "MikeJohnson",
    totalRecipes: 30,
    followers: 300,
    isFollowing: false,
  },
]

const FindUser = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div
        className="container mx-auto px-4 py-8 mt-20 flex-grow"
        style={{ maxWidth: "70%" }}
      >
        {/* Search bar section */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search for users..."
            className="w-full max-w-lg px-4 py-2 border rounded-l-lg focus:outline-none"
          />
          <button className="px-4 py-2 bg-primary text-white rounded-r-lg">
            <FaSearch />
          </button>
        </div>

        {/* Users list */}
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center bg-white shadow-md rounded-lg p-4 space-x-4"
            >
              <img
                src={user.photo}
                alt={user.username}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-grow">
                <p className="text-lg font-medium">{user.username}</p>
                <p className="text-sm text-gray-500">
                  {user.totalRecipes} Recipes • {user.followers} Followers
                </p>
              </div>
              <button
                className={`px-4 py-2 rounded ${
                  user.isFollowing
                    ? "bg-gray-300 text-gray-700"
                    : "bg-primary text-white"
                }`}
              >
                {user.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default FindUser
