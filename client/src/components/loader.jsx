import React from "react"
import "./loader.css"

const Spinner = ({ width, height, backgroundColor, padding }) => {
  return (
    <div
      class="loader"
      style={{
        width: `${width}`,
        height: `${height}`,
        backgroundColor: `${backgroundColor}`,
        padding: `${padding}`,
      }}
    ></div>
  )
}

export default Spinner
