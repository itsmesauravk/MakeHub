import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { IoHeart, IoPersonAdd, IoChatbubble } from "react-icons/io5"

const Notification = () => {
  const notifications = [
    {
      id: 1,
      icon: <IoHeart className="text-red-500 text-xl" />,
      message: "Someone liked your post.",
      time: "2 minutes ago",
    },
    {
      id: 2,
      icon: <IoPersonAdd className="text-blue-500 text-xl" />,
      message: "User123 started following you.",
      time: "10 minutes ago",
    },
    {
      id: 3,
      icon: <IoChatbubble className="text-green-500 text-xl" />,
      message: "Someone commented on your post.",
      time: "1 hour ago",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className=" container mx-auto px-4 py-8 mt-16 flex-grow items-center">
        <h1 className="text-4xl font-bold text-center mb-8">Notifications</h1>
        <div className="flex  justify-between items-center">
          <h2 className="text-2xl font-semibold">Earlier</h2>
          <button className="text-primary font-medium hover:underline">
            Mark all as Read
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mt-4 space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center w-full max-w-md bg-white shadow-md rounded-lg p-4 transform transition-all hover:scale-105"
            >
              <div className="mr-4">{notification.icon}</div>
              <div className="flex-grow">
                <p className="text-lg font-medium">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="text-primary font-medium hover:underline">
            View All Notifications
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Notification
