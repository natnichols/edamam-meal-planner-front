// npm modules
import { NavLink } from 'react-router-dom'

// css
import styles from './NavBar.module.css'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      {user ?
        <>
          <p>Welcome, {user.name}</p>
          <p><NavLink to="/profiles">Profiles</NavLink></p>
          <p><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></p>
          <p><NavLink to="/auth/change-password">Change Password</NavLink></p>
        </>
      :
        <>
          <p><NavLink to="/auth/login">Log In</NavLink></p>
          <p><NavLink to="/auth/signup">Sign Up</NavLink></p>
        </>
      }
    </nav>
  )
}

export default NavBar
