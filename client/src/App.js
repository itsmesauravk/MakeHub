import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Recipe from './pages/recipe';
import UserProfile from './pages/UserProfile';
import AllRecipes from './pages/AllRecipes';
import MyAccount from './pages/MyAccount';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewRecipe from './pages/NewRecipe';
import Search from './pages/Search';
import PrivateRoute from './PrivateRoutes';
import ForgotPassword from './pages/ForgotPassword';
import OtpVerification from './pages/OtpVerification';
import ResetPassword from './pages/ResetPassword';




function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipe/:slug" element={<Recipe />} />
        <Route path="/view-user/profile" element={<UserProfile />} />
        <Route path="/all-recipes" element={<AllRecipes />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/email-verification' element={<OtpVerification />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/my-account/:slug"
          element={<MyAccount />}
        />

        <Route
          path="/my-account/:slug/create-recipe"
          element={<NewRecipe />}
        />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>
    </Router>
  );
}

export default App;

