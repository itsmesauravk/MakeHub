import React, { useState, useEffect, useContext } from "react"
import Logo from "./Logo"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

import { LoginContext } from "./LoginContext"

const Navbar = () => {
  const [bgColor, setBgColor] = useState("transparent")
  const { handleLogin } = useContext(LoginContext)

  useEffect(() => {
    const handleScroll = () => {
      setBgColor(window.scrollY > 20 ? "#FBFBFB" : "transparent")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </nav>
  )
}

export default Navbar
