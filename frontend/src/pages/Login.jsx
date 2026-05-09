import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'

const Login = ({isLoggedIn,setIsLoggedIn}) => {

  const [formData, setFormData] = useState({

    email: "",
    password: ""

  })
  const navigate= useNavigate()

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
        "/user/login",
        formData
      )

      console.log(response)
      
      localStorage.setItem("token", response.data.token)

      toast.success(response.data.message)
    
      
    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login failed"
      )

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-100"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

          <button
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
          >
            Login
          </button>

        </div>

        <p className="mt-4 text-center">

          Don’t have an account?

          <Link
            to="/register"
            className="text-blue-500 ml-1"
          >
            Register
          </Link>

        </p>

      </form>

    </div>

  )

}

export default Login