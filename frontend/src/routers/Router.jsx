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
const Router = () => {
    let [isLoggedIn,setIsLoggedIn] = useState(null)
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if (token) {
        setIsLoggedIn(true)
        }
    },[])
  return (
      <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path='/profile' element={isLoggedIn?<UpdateProfile/>:<Login/>}/>
          <Route path="/register" element={isLoggedIn ? <Home /> : <Register />} />
          

          <Route path="/login" element={isLoggedIn ? <Home /> : <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
          />} />
          
          <Route
  path="/edit-application/:id"
  element={<EditApplication />}
          />
          <Route path='/all-applications' element={<AllApplications />} />
          <Route path='/add-jobs' element={<AddJobApplication />} />
          <Route
  path="/edit-company/:id"
  element={<EditCompany />}
          />
          <Route path='/all-applications' element={<AllApplications />} /> 
          <Route path='/add-company' element={<AddCompany />} />
          <Route path="/add-reminder" element={<AddReminder />} />
          <Route path='/edit-reminder/:id' element={<EditReminder />} />
          <Route
  path="/dashboard"
  element={<Dashboard />}
/>

    </Routes>
  )
}

export default Router