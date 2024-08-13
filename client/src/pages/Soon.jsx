import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Navbar from "../components/Navbar"

const Soon = () => {
  const [countdown, setCountdown] = useState(5)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const text = textRef.current
    const image = imageRef.current

    gsap.fromTo(
      text,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power3.out",
      }
    )

    gsap.fromTo(
      image,
      { opacity: 0, y: 50, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: 1,
        ease: "power3.out",
        repeat: -1,
        yoyo: true,
      }
    )
  }, [countdown])

  return (
    <div>
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center ">
        <h1
          ref={textRef}
          className="text-5xl md:text-7xl font-extrabold text-primary text-center mb-10"
        >
          Updating Soon!
        </h1>
        <img
          ref={imageRef}
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/48265441-add4-48b6-99ce-fb71117c63bb/dfgn4hn-ccaed2ac-2678-47ca-9f48-c8c349f41c77.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ4MjY1NDQxLWFkZDQtNDhiNi05OWNlLWZiNzExMTdjNjNiYlwvZGZnbjRobi1jY2FlZDJhYy0yNjc4LTQ3Y2EtOWY0OC1jOGMzNDlmNDFjNzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.CFronzGu-mbfB2WkA_rDx9GurXUXVsoWLpCjf_KYQDk"
          alt="Shinchan Dancing"
          className="w-56 h-auto"
        />
      </div>
    </div>
  )
}

export default Soon
