import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Spinner } from "../components/loader"
import FetchErrorPage from "../components/FetchErrorPage"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [fecthError, setFetchError] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Fetch Error */}
      {fecthError && <FetchErrorPage error={fecthError} />}
      {/* Title */}
      <h1 className="text-3xl font-bold text-primary mb-6">Reset Password</h1>

      {/* Image */}
      <div className="mb-6">
        <img
          src="https://www.tutorix.com/images/login-punch.png"
          alt="reset-password"
          className="w-32 h-32"
        />
      </div>

      {/* Instruction Text */}
      <p className="text-center text-gray-600 mb-6">
        Your new password must be different from the <br />
        previously used password.
      </p>

      {/* Input Fields */}
      <div className="w-full max-w-sm mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Back to Login Link */}
      <div className="mb-6">
        <Link to="/login" className="text-primary hover:underline">
          Back to Login
        </Link>
      </div>

      {/* Update Password Button */}
      <button
        className="w-full max-w-sm bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
        disabled={loading}
      >
        {loading ? (
          <div className="flex gap-2 justify-center items-center">
            Please Wait{" "}
            <Spinner width={"20px"} height={"20px"} padding={"2px"} />
          </div>
        ) : (
          "Update Password"
        )}
      </button>
    </div>
  )
}

export default ResetPassword
