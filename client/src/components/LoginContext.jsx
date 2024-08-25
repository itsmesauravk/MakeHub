import { createContext, useState } from "react"

export const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const [openLogin, setOpenLogin] = useState(false)
  const handleLogin = () => {
    console.log("Login")
    setOpenLogin(true)
  }
  const handleLoginClose = () => {
    console.log("Login")
    setOpenLogin(false)
  }

  return (
    <LoginContext.Provider
      value={{ openLogin, setOpenLogin, handleLogin, handleLoginClose }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider
