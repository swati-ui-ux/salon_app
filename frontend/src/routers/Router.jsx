import React, { useEffect, useState } from 'react'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'
import { Route, Routes } from 'react-router-dom'
import UpdateProfile from '../pages/Profile'
import EditApplication from '../pages/EditApplication'
import AllApplications from '../pages/AllApplications'
import AddJobApplication from '../pages/AddJobApplication'
import EditCompany from '../pages/EditCompany'
import AddCompany from '../pages/AddCompany'
import AddReminder from '../pages/AddReminder'
import EditReminder from '../pages/EditReminder'
import Dashboard from '../pages/Dashboard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
// import {IconName} from "react-icons/fi"
const Router = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(null)
  const [isOpen,setIsOpen] = useState(false)
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if (token) {
        setIsLoggedIn(true)
        }
    },[])
    return (
        <>
        {
  isLoggedIn && (
    <>

      {/* Mobile */}

      <div className="block md:hidden">

        {
          isOpen ? (
            <Sidebar setIsOpen={setIsOpen} isOpen={isOpen}/>
          ) : (
            <button onClick={() => setIsOpen(true)} className='text-4xl text-gray-500 cursor-pointer'>
              ☰
            </button>
          )
        }

      </div>

      {/* Desktop */}

      <div className="hidden md:block">

        <Navbar  setIsLoggedIn={setIsLoggedIn}/>

      </div>

    </>
  )
}
      <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/register" element={isLoggedIn ? <Home /> : <Register />} />
          

          <Route path="/login" element={isLoggedIn ? <Home /> : <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
          />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/profile' element={isLoggedIn?<UpdateProfile/>:<Login/>}/>
          <Route path='/add-jobs' element={<AddJobApplication />} />
          <Route path='/add-applications' element={isLoggedIn?<AddJobApplication />:<Login />}/> 
          <Route path="/edit-application/:id" element={isLoggedIn?<EditApplication />:<Login/>} />
          <Route path='/all-applications' element={isLoggedIn?<AllApplications />:<Login/>} />
          <Route path='/add-company' element={isLoggedIn?<AddCompany />:<Login/>} />
          <Route path="/edit-company/:id" element={isLoggedIn?<EditCompany />:<Login/>} />
          <Route path="/add-reminder" element={isLoggedIn?<AddReminder />:<Login/>} />
          <Route path='/edit-reminder/:id' element={isLoggedIn?<EditReminder />:<Login/>} />

    </Routes>
</>
  )
}

export default Router