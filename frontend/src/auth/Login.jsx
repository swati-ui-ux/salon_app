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
      setIsLoggedIn(true)
      navigate("/")
      
    } catch (error) {
      console.log(error.response?.data?.message)
      console.log(error)
      toast.error(
        error.response?.data?.message || "Login failed"
      )

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-900">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 border border-gray-600 p-8 rounded-2xl shadow-lg w-100"
      >

        <h1 className="text-3xl text-gray-200 font-bold text-center mb-6">
          Login
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full text-gray-100 border border-gray-500 p-3 rounded-lg outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-500 text-gray-100 p-3 rounded-lg outline-none"
          />

          <button
            className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-950 cursor-pointer"
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