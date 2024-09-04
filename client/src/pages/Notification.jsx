import React, { useContext, useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { IoHeart, IoPersonAdd, IoChatbubble } from "react-icons/io5"
import { LoginContext } from "../components/LoginContext"
import { Spinner } from "../components/loader"

const Notification = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)

  const { userBasicInfo } = useContext(LoginContext)

  const handleGetNotifi = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/recipe/all-notifications/${userBasicInfo?._id}`
      )
      const data = await response.json()

      if (data.success) {
        setNotifications(data.data)
        setLoading(false)
      } else {
        setNotifications(false)
        console.log(data.message)
      }
    } catch (error) {
      console.log("Error while fetching notifications", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      handleGetNotifi()
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col   container mx-auto px-4 py-8 mt-16 flex-grow items-center">
        <h1 className="text-4xl font-bold text-center mb-8">Notifications</h1>
        <div className="flex gap-x-44  justify-between items-center mb-10">
          <h2 className="text-2xl font-semibold">Earlier</h2>
          <button className="text-primary font-medium hover:underline">
            Mark all as Read
          </button>
        </div>
        {loading ? (
          <Spinner
            width={"2rem"}
            height={"2rem"}
            backgroundColor={"#F3043A"}
            padding={"0.2rem"}
          />
        ) : (
          <>
            <div className="flex flex-col items-center justify-center mt-4 space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center w-full max-w-md bg-white shadow-md rounded-lg p-4 transform transition-all hover:scale-105"
                  style={{
                    borderRight:
                      notification?.read === false
                        ? "4px solid #2E2265"
                        : "none",
                  }}
                >
                  {/* like  */}
                  {notification?.type === "like" && (
                    <>
                      <div className="mr-4">
                        <IoHeart className="text-red-500 text-xl" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-lg font-medium">
                          <span>{notification?.sender?.username}</span> likes
                          your recipe{" "}
                          <span> {notification?.recipe?.title}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification?.createdAt.split("T")[0]} at{" "}
                          {notification?.createdAt.split("T")[1].split(".")[0]}
                        </p>
                      </div>
                    </>
                  )}
                  {/* follow  */}
                  {notification?.type === "follow" && (
                    <>
                      <div className="mr-4">
                        <IoHeart className="text-red-500 text-xl" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-lg font-medium">
                          <span>{notification?.sender?.username}</span> started
                          following you
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification?.createdAt.split("T")[0]} at{" "}
                          {notification?.createdAt.split("T")[1].split(".")[0]}
                        </p>
                      </div>
                    </>
                  )}
                  {/* comment  */}
                  {notification?.type === "comment" && (
                    <>
                      <div className="mr-4">
                        <IoChatbubble className="text-green-500 text-xl" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-lg font-medium">
                          <span>{notification?.sender?.username}</span> comment
                          on your recipe{" "}
                          <span> {notification?.recipe?.title}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification?.createdAt.split("T")[0]} at{" "}
                          {notification?.createdAt.split("T")[1].split(".")[0]}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="text-primary font-medium hover:underline">
                View All Notifications
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Notification
