import React, { useState } from "react"
import { MdClose } from "react-icons/md"

const EditProfile = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation and submission logic
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation password do not match!")
      return
    }

    const updatedProfile = {
      username,
      bio,
      currentPassword,
      newPassword,
    }

    console.log("Updated Profile Data: ", updatedProfile)
    // Call API to update profile or handle data as needed
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 h-10 w-10 "
          >
            <MdClose className="w-10 h-10" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <h3 className="text-lg font-semibold">General</h3>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your new username"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your new bio"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 mt-4 rounded-lg transition-all"
            >
              Update
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Privacy</h3>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter current password"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter new password"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Confirm new password"
              />
            </div>
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 mt-4 rounded-lg transition-all"
            >
              Change Password
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-red-600">Warning</h3>
            <p className="text-sm text-red-600">
              Deleting your account is irreversible. Please proceed with
              caution.
            </p>
            <button
              type="button"
              onClick={() => alert("Account deletion process initiated")}
              className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 mt-4 rounded-lg transition-all"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
