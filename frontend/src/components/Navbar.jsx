// components/Navbar.jsx

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({setIsLoggedIn}) => {
    const navigate = useNavigate()
    let handleLogout = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false)
        navigate('/login')
    }
  return (

    <div className="bg-black text-white p-4 flex gap-6 justify-between">
      <div className='flex gap-6'>
         <Link to="/">
        Home
      </Link>

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/profile">
        Profile
      </Link>

      <Link to="/all-applications">
        Applications
      </Link>

      <Link to="/add-company">
        Companies
      </Link>

      <Link to="/add-reminder">
        Reminders
      </Link>
      </div>
     
     <button onClick={handleLogout} className='cursor-pointer'>Logout</button>
    </div>

  )

}

export default Navbar