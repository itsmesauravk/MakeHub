import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Recipe from './pages/recipe';
import UserProfile from './pages/UserProfile';
import AllRecipes from './pages/AllRecipes';
import MyAccount from './pages/MyAccount';
import About from './pages/About';
import Soon from './pages/Soon';
// import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipe/:slug" element={<Recipe />} />
        <Route path="/view-user/profile" element={<UserProfile />} />
        <Route path="/all-recipes" element={<AllRecipes />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path='/about' element={<About />} />
        <Route path='/coming-soon' element={<Soon />} />
      </Routes>
    </Router>
  );
}

export default App;
