// components/Sidebar.jsx

import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
const Sidebar = ({setIsOpen,isOpen}) => {

  const location = useLocation()

  const navigate = useNavigate()

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("userId")

    navigate("/login")

    window.location.reload()

  }

  // Active Link Style
  const activeClass = (path) => {

    return location.pathname === path
      ? "bg-gray-800 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white"

  }

  return (

   <div className="w-64 min-h-screen bg-gray-900 shadow-2xl p-5 fixed left-0 top-0 z-50">

      {/* Logo */}

      <div className='w-full '>
        <button onClick={() => setIsOpen(false)} className='text-2xl cursor-pointer text-white hover:text-gray-700 transition  duration-300 transform-3d ease-in-out absolute right-5 '>
              <RxCross2 size={25}/>
            </button>
      </div>
      <h1 className="text-3xl font-bold text-white mb-5 mt-10 text-center">
        Job Tracker
      </h1>
      {/* Navigation */}

      <div className="flex flex-col gap-3">

        <Link
          to="/dashboard"
          className={`px-4 py-3 text-white rounded-xl transition duration-300 ${activeClass("/dashboard")}`}
        >
          Dashboard
        </Link>

        <Link
          to="/profile"
          className={`px-4 py-3 rounded-xl text-white transition duration-300 ${activeClass("/profile")}`}
        >
          Profile
        </Link>

        <Link
          to="/add-jobs"
          className={`px-4 py-3 rounded-xl text-white transition duration-300 ${activeClass("/add-jobs")}`}
        >
          Add Job
        </Link>

        <Link
          to="/all-applications"
          className={`px-4 py-3 rounded-xl text-white transition duration-300 ${activeClass("/all-applications")}`}
        >
          Applications
        </Link>

        <Link
          to="/add-company"
          className={`px-4 py-3 rounded-xl text-white transition duration-300 ${activeClass("/add-company")}`}
        >
          Companies
        </Link>

        <Link
          to="/add-reminder"
          className={`px-4 py-3 rounded-xl text-white transition duration-300 ${activeClass("/add-reminder")}`}
        >
          Reminders
        </Link>

      </div>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="w-full mt-10 bg-black hover:bg-gray-900 cursor-pointer text-white py-3 rounded-xl transition duration-300"
      >
        Logout
      </button>

    </div>

  )

}

export default Sidebar