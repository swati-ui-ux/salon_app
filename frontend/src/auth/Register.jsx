import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: "",
    phone: "",
    careerGoal: "",
    profileImage: "",
    city: "",
    country: ""

  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await api.post(
        "/user/register",
        formData
      )

      toast.success(response.data.message)
     console.log(response)
      navigate("/")

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Register failed"
      )

    }

  }

  return (

    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1e293b]/90 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl shadow-black/40 p-8"
      >

        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Register
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <textarea
            placeholder="Career Goal"
            name="careerGoal"
            value={formData.careerGoal}
            onChange={handleChange}
            className="w-full h-24 bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 resize-none"
          />

          <input
            type="text"
            placeholder="Profile Image URL"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <button
            className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold p-3 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            Register
          </button>

        </div>

        <p className="mt-4 text-center">
          Already have an account?

          <Link
            to="/"
            className="text-blue-500 ml-1"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  )

}

export default Register