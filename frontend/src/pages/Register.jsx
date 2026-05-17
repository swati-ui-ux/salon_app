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

      navigate("/")

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Register failed"
      )

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

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

          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

          <textarea
            placeholder="Career Goal"
            name="careerGoal"
            value={formData.careerGoal}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none h-24"
          />

          <input
            type="text"
            placeholder="Profile Image URL"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

          <button
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
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