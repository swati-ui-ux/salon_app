// pages/Dashboard.jsx

import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'
import {Pie,PieChart,Tooltip,ResponsiveContainer} from "recharts"
const Dashboard = () => {

  const [stats, setStats] = useState({

    totalApplications: 0,
    interviewed: 0,
    rejected: 0,
    offered: 0,
    companies: 0,
    pendingReminders: 0

  })
    const data = [ 
  {
    name: "Applied",
    value: stats.applied
  },

  {
    name: "Interviewed",
    value: stats.interviewed
  },

  {
    name: "Rejected",
    value: stats.rejected
  },

  {
    name: "Offered",
    value: stats.offered
  }]
    
    
    // const data = 

  // Get Dashboard Stats
  const getDashboardStats = async () => {

    try {

      const response = await api.get(
        "/dashboard/stats"
      )

      setStats(response.data)

    } catch (error) {

      console.log(error)

      toast.error("Failed to load dashboard")

    }

  }

  useEffect(() => {

    getDashboardStats()

  }, [])

  return (
 <>
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Heading */}

      <h1 className="text-4xl font-bold text-center mb-10">
        Dashboard
      </h1>

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total Applications */}

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold text-gray-600">
            Total Applications
          </h2>

          <p className="text-4xl font-bold mt-4 text-blue-500">
            {stats.totalApplications}
          </p>

        </div>

        {/* Interviewed */}

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold text-gray-600">
            Interviewed
          </h2>

          <p className="text-4xl font-bold mt-4 text-green-500">
            {stats.interviewed}
          </p>

        </div>

        {/* Rejected */}

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold text-gray-600">
            Rejected
          </h2>

          <p className="text-4xl font-bold mt-4 text-red-500">
            {stats.rejected}
          </p>

        </div>

        {/* Offered */}

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold text-gray-600">
            Offers
          </h2>

          <p className="text-4xl font-bold mt-4 text-yellow-500">
            {stats.offered}
          </p>

        </div>

        {/* Companies */}

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold text-gray-600">
            Companies
          </h2>

          <p className="text-4xl font-bold mt-4 text-purple-500">
            {stats.companies}
          </p>

        </div>

        {/* Pending Reminders */}

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold text-gray-600">
            Pending Reminders
          </h2>

          <p className="text-4xl font-bold mt-4 text-pink-500">
            {stats.pendingReminders}
          </p>

        </div>

      </div>

      </div>
     
          <div className="bg-white shadow-lg rounded-2xl p-6 mt-10">

  <h2 className="text-2xl font-bold mb-6 text-center">
    Application Status Chart
  </h2>

  <ResponsiveContainer
    width="100%"
    height={400}
  >

    <PieChart>

      <Pie
        data={data}
        dataKey="value"
        outerRadius={140}
        label
      />

      <Tooltip />

    </PieChart>

  </ResponsiveContainer>

</div>
</>

  )

}

export default Dashboard