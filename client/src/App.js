import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Recipe from './pages/recipe';
import UserProfile from './pages/UserProfile';
import AllRecipes from './pages/AllRecipes';
import MyAccount from './pages/MyAccount';
import About from './pages/About';
import Soon from './pages/Soon';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewRecipe from './pages/NewRecipe';
// import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipe/:slug" element={<Recipe />} />
        <Route path="/view-user/profile" element={<UserProfile />} />
        <Route path="/all-recipes" element={<AllRecipes />} />
        <Route path='/about' element={<About />} />
        <Route path='/coming-soon' element={<Soon />} />

        <Route path="/my-account/:slug" element={<MyAccount />} />

        <Route path='/my-account/:slug/create-recipe' element={<NewRecipe />} />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>
    </Router>
  );
}

export default App;
