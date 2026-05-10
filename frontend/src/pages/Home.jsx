import React from 'react'
import Profile from './Profile'
import { Link } from 'react-router-dom'
import AddJobApplication from './AddJobApplication'
import AddCompany from './AddCompany'
import AddReminder from './AddReminder'

const Home = () => {
  
  return (
    <div>Home
      <Link to='/profile'>Profile</Link>
      <Link to="/add-jobs">Add job</Link>
      <Link to='/add-company'>Add company</Link>
      <Link to='/add-reminder'>Add Remnder</Link>
      
    </div>
  )
}

export default Home