import React, { useEffect, useState } from 'react'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'
import { Route, Routes } from 'react-router-dom'
import UpdateProfile from '../pages/Profile'
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

    </Routes>
  )
}

export default Router