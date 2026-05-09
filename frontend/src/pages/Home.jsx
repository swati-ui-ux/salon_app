import React from 'react'
import Profile from './Profile'
import { Link } from 'react-router-dom'

const Home = () => {
  
  return (
    <div>Home
      <Link to='/profile'>Profile</Link>
      
    </div>
  )
}

export default Home