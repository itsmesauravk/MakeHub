import React, { useState, useEffect } from "react"
import Logo from "./Logo"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

const Navbar = () => {
  const [bgColor, setBgColor] = useState("transparent")
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
      <div className="action-links flex items-center space-x-4">
        <Button
          id="profile-button"
          aria-controls={open ? "profile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            p: 0,
            minWidth: "auto",
            "& .MuiButton-startIcon": {
              display: "none",
            },
          }}
        >
          <img
            src="/images/burger.jpg"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "profile-button",
          }}
        >
          <Link to="/my-account">
            <MenuItem onClick={handleClose}>My Account</MenuItem>
          </Link>

          <MenuItem onClick={handleClose} className="text-red-700">
            Logout
          </MenuItem>
        </Menu>
      </div>
    </nav>
  )
}

export default Navbar
