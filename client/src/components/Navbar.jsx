import React, { useState, useEffect, useContext } from "react"
import Logo from "./Logo"
import { Link } from "react-router-dom"

import { LoginContext } from "./LoginContext"

//for avatar
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import { deepOrange, deepPurple } from "@mui/material/colors"

const Navbar = () => {
  const [bgColor, setBgColor] = useState("transparent")
  const { isLoggedIn, userBasicInfo } = useContext(LoginContext)

  useEffect(() => {
    const handleScroll = () => {
      setBgColor(window.scrollY > 20 ? "#FBFBFB" : "transparent")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  //for avatar
  function stringToColor(string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = "#"

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    }
  }

  return (
    <nav
      className="navbar fixed top-0 left-0 w-full z-10 flex justify-between items-center px-16 py-4 bg-opacity-90"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.3s ease",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Logo />
      <div className="navbar-links flex space-x-6 text-secondary">
        <Link
          to="/"
          className="font-semibold hover:text-primary transition-colors"
        >
          Home
        </Link>
        <Link
          to="/all-recipes?page=1"
          className="font-semibold hover:text-primary transition-colors"
        >
          All Recipes
        </Link>
        <Link
          to="/about"
          className="font-semibold hover:text-primary transition-colors"
        >
          About Us
        </Link>

        <Link
          to="/coming-soon"
          className="font-semibold hover:text-primary transition-colors"
        >
          Soon
        </Link>
      </div>

      {isLoggedIn ? (
        <Link
          to={`/my-account/${userBasicInfo?.slug}`}
          className="flex items-center gap-1 translate-x-1"
        >
          {userBasicInfo?.profilePicture ? (
            <Avatar
              alt="Profile Picture"
              style={{ width: "25px", height: "25px", objectFit: "cover" }}
              src={userBasicInfo?.profilePicture}
            />
          ) : (
            <Stack direction="row" spacing={1}>
              <Avatar
                style={{ width: "25px", height: "25px" }}
                {...stringAvatar(userBasicInfo?.username || "User")}
              />
            </Stack>
          )}

          <p className="text-primary font-semibold ">
            {userBasicInfo?.username}
          </p>
        </Link>
      ) : (
        <Link
          to="/login"
          className="text-primary font-semibold hover:underline hover:text-primary-dark transition duration-300 ease-in-out"
        >
          Log In
        </Link>
      )}
    </nav>
  )
}

export default Navbar
