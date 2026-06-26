import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { GoogleLogin } from "@react-oauth/google"


const Login = ({isLoggedIn,setIsLoggedIn}) => {

  const [formData, setFormData] = useState({

    email: "",
    password: ""

  })
  const [isShowPassword,setIsShowPassword] = useState(false)
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

      
      localStorage.setItem("token", response.data.token)

      toast.success(response.data.message)
      setIsLoggedIn(true)
      navigate("/")
      
    } catch (error) {
      console.log(error.response?.data?.message)
      console.log(error)
      toast.error(
        error.response?.data?.message)

    }

  }
  
const handleGoogleLogin = async (credentialResponse) => {
  try {
    const res = await api.post("/auth/google", {
      token: credentialResponse.credential,
    });
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      toast.success("Google Login Successful");
      setIsLoggedIn(true);
      navigate("/");
    }
  } catch (error) {
    console.log(error);

    toast.error(error.response?.data?.message);
  }
};


  
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
        <div className="w-full border border-gray-500 text-gray-100 p-3 rounded-lg flex justify-between items-center">
      <input
        type={isShowPassword ? "text" : "password"}
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="bg-transparent outline-none flex-1 text-gray-100"
      />

      <span
        className="cursor-pointer select-none"
        onClick={() => setIsShowPassword(!isShowPassword)}
      >
        {isShowPassword ? "🙈" : "👁️"}
      </span>
</div>

          <button
            className="w-full bg-gray-900 text-white p-3 mb-4 rounded-lg hover:bg-gray-950 cursor-pointer"
          >
            Login
          </button>
        </div>

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
            console.log("Login failed")
            }}
          />
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