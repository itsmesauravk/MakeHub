import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Spinner } from "../components/loader"
import FetchErrorPage from "../components/FetchErrorPage"

const OtpVerification = () => {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  const handleResendCode = () => {
    console.log("Test")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Fetch Error */}
      {fetchError && <FetchErrorPage error={fetchError} />}

      {/* Title */}
      <h1 className="text-3xl font-bold text-primary mb-6">
        Verify Your Email
      </h1>

      {/* Image */}
      <div className="mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6195/6195696.png"
          alt="OTP verification"
          className="w-32 h-32"
        />
      </div>

      {/* Instruction Text */}
      <p className="text-center text-gray-600 mb-4">
        Please enter the 6-digit code sent to <br />
        <span className="font-semibold text-gray-800">saurav@gmail.com</span>
      </p>
      <p className="text-gray-500 italic text-sm mb-2">
        Code Expires in 5 minutes
      </p>

      {/* OTP Input */}
      <div className="mb-6 w-full max-w-sm">
        <input
          type="number"
          placeholder="Enter 6-Digit OTP"
          maxLength={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-center text-lg"
        />
      </div>

      {/* Resend Code Button */}
      <div className="flex gap-2 mb-6">
        <p className="text-gray-600">Didn't receive the code?</p>
        <button
          onClick={handleResendCode}
          className="text-primary underline hover:cursor-pointer"
        >
          Resend Code
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <Link to="/forgot-password" className="text-primary hover:underline">
          Change Email
        </Link>
      </div>

      {/* Verify Button */}
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
          "Verify"
        )}
      </button>
    </div>
  )
}

export default OtpVerification
