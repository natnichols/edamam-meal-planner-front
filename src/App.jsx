// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import ShoppingList from './pages/ShoppingList/ShoppingList'
import RecipeDetails from './pages/RecipeDetails/RecipeDetails'
import RecipeIndex from './pages/RecipeIndex/RecipeIndex'
import RecipeSearch from './pages/RecipeSearch/RecipeSearch'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as profileService from './services/profileService'
import * as recipeService from './services/recipeService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [profile, setProfile] = useState({})
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        const profileData = await profileService.getUserProfile(user.profile)
        setProfile(profileData)
      }
      fetchUserProfile()
    }
  }, [user])

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const handleAddRecipe = async (recipeData) => {
    // make API call with title/edamamId of recipe
    const updatedProfile = await recipeService.addRecipe(recipeData)
    // update profile state, adding new recipe
    setProfile(updatedProfile)
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route path="/recipes" element={<RecipeIndex profile={profile} />} />
        <Route path="/recipes/:edamamId" element={
          <RecipeDetails 
            profile={profile} 
            handleAddRecipe={handleAddRecipe}
          />}
        />
        <Route path="/recipes/search" element={<RecipeSearch />} />
        <Route path="/shopping" element={<ShoppingList />} />

        <Route path="/" element={<Landing user={user} />} />
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
