import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'

const Home = () => {
  const [applications,setApplications] = useState([])
  const getApplication = async() => {
    try {
      const res = await api.get('/applications/all')
      console.log(res)
      setApplications(res.data.applications)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getApplication()
  },[])
  return (
    <>
      
    <div className="p-10 bg-gray-800  text-gray-300 min-h-screen">
  
      <h1 className="text-4xl mt-15 font-bold">
        Welcome To Job Tracker App
      </h1>

      <p className="mt-4 text-gray-600">
        Track your applications, reminders and companies easily.
      </p>
      
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
         <Link
    to="/add-applications"
    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/15 backdrop-blur-md border border-cyan-400/30 text-cyan-300 font-semibold hover:bg-cyan-500 hover:text-white hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300"
  >
    ➕ Add Job Application
  </Link>
          <Link
  to="/add-company"
  className="flex items-center justify-center gap-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-2xl py-4 font-semibold backdrop-blur-md hover:bg-green-500 hover:text-white hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
>
  🏢 Add Company
          </Link>
          <Link
  to="/add-reminder"
  className="flex items-center justify-center gap-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-2xl py-4 font-semibold backdrop-blur-md hover:bg-yellow-500 hover:text-white hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105 transition-all duration-300"
>
  ⏰ Add Reminder
</Link>
        <Link
  to="/all-applications"
  className="flex items-center justify-center gap-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-2xl py-4 font-semibold backdrop-blur-md hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
>
  📄 View Applications
</Link>
        </div>
      {/* Recent Applications */}
<div className="mt-10">
  <h2 className="text-2xl font-bold text-white mb-6">
    Recent Applications
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {applications.length > 0 ? applications.slice(0,3).map((app) => (

      <div
        key={app.id}
        className="bg-[#1e293b] border border-slate-700 rounded-2xl p-5 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
      >

        <h3 className="text-xl font-bold text-white">
          {app.companyName}
        </h3>

        <p className="text-gray-300 mt-2">
          <span className="font-semibold text-white">
            Role:
          </span>{" "}
          {app.jobTitle}
        </p>

        <p className="text-gray-300 mt-2">
          <span className="font-semibold text-white">
            Location:
          </span>{" "}
          {app.jobLocation || "N/A"}
        </p>

        <div className="mt-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold">
            {app.status}
          </span>
        </div>

      </div>

    )):<h1>No Application is here add aplication</h1>}

            
  </div>

</div>
      </div>

</>
  )

}

export default Home