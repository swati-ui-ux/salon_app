// pages/Profile.jsx

import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'

const Profile = () => {

  const [user, setUser] = useState(null)

  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({

    name: "",
    phone: "",
    careerGoal: "",
    profileImage: "",
    city: "",
    country: ""

  })

  const getProfile = async () => {

    try {

      const response = await api.get("/user/profile")

      setUser(response.data.user)

      setFormData({

        name: response.data.user.name || "",
        phone: response.data.user.phone || "",
        careerGoal: response.data.user.careerGoal || "",
        profileImage: response.data.user.profileImage || "",
        city: response.data.user.city || "",
        country: response.data.user.country || ""

      })

    } catch (error) {

      console.log(error)

      toast.error("Failed to load profile")

    }

  }

  useEffect(() => {

    getProfile()

  }, [])

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })

  }

  const handleUpdate = async () => {

    try {

      const response = await api.put(
        "/user/profile",
        formData
      )

      toast.success(response.data.message)

      setUser(response.data.user)

      setIsEditing(false)

    } catch (error) {

      console.log(error)

      toast.error("Update failed")

    }

  }

  if (!user) {

    return (

      <div className="text-center min-h-screen mt-10 text-2xl text-gray-100">
        Loading...
      </div>

    )

  }
const handleDelete = async () => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account?"
  )

  if (!confirmDelete) return

  try {

    const response = await api.delete(
      "/user/profile"
    )

    toast.success(response.data.message)

    // Remove token
    localStorage.removeItem("token")

    // Redirect login
    window.location.href = "/"

  } catch (error) {

    console.log(error)

    toast.error("Delete failed")

  }

}
  

return (

  // <div className="min-h-screen bg-gray-100 px-4 md:px-10 py-10">

    <div className="min-h-screen bg-gray-950  text-white p-6 md:p-10">

      {/* TOP SECTION */}

      <div className="flex flex-col md:flex-row md:items-center gap-8 border-b border-gray-800 pb-8">

        {/* IMAGE */}

        <div className="flex justify-center">

          <img
            src={
              formData.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="w-60 h-60 rounded-full object-cover border-2 border-gray-500 shadow-lg shadow-blue-500/20"
          />

        </div>

        {/* USER INFO */}

        <div className="flex-1">

          {
            isEditing ? (

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500
"
              />

            ) : (

              <h1 className="text-4xl font-bold text-white">
                {user.name}
              </h1>

            )
          }

          <p className="text-gray-400 text-lg mt-2 break-all">
            {user.email}
          </p>

          {
            isEditing && (

              <input
                type="text"
                name="profileImage"
                placeholder="Profile Image URL"
                value={formData.profileImage}
                onChange={handleChange}
                 className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500
"
              />

            )
          }

        </div>

      </div>

      {/* DETAILS SECTION */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

        {/* PHONE */}

        <div className="bg-gray-900 borderborder-gray-800 p-5 rounded-2xl hover:border-blue-500 transition-all duration-300">

          <h2 className="text-lg font-semibold mb-3">
            Phone
          </h2>

          {
            isEditing ? (

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500
"
              />

            ) : (

             <p className="text-gray-300">
                {user.phone || "Not Added"}
              </p>

            )
          }

        </div>

        {/* CITY */}

         <div className="bg-gray-900 borderborder-gray-800 p-5 rounded-2xl hover:border-blue-500 transition-all duration-300">

          <h2 className="text-lg  font-semibold mb-3">
            City
          </h2>

          {
            isEditing ? (

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                 className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500
"
              />

            ) : (

              <p className="text-gray-300">
                {user.city || "Not Added"}
              </p>

            )
          }

        </div>

        {/* COUNTRY */}

         <div className="bg-gray-900 borderborder-gray-800 p-5 rounded-2xl hover:border-blue-500 transition-all duration-300">

          <h2 className="text-lg font-semibold mb-3">
            Country
          </h2>

          {
            isEditing ? (

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500
"/>

            ) : (

              <p className="text-gray-300">
                {user.country || "Not Added"}
              </p>

            )
          }

        </div>

        {/* CAREER GOAL */}

         <div className="bg-gray-900 borderborder-gray-800 p-5 rounded-2xl hover:border-blue-500 transition-all duration-300">

          <h2 className="text-lg font-semibold mb-3">
            Career Goal
          </h2>

          {
            isEditing ? (

              <textarea
                name="careerGoal"
                value={formData.careerGoal}
                onChange={handleChange}
                rows="5"
                className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500
"
              />

            ) : (

              <p className="text-gray-300 leading-7">
                {user.careerGoal || "Not Added"}
              </p>

            )
          }

        </div>

      </div>

      {/* BUTTONS */}

      <div className="flex flex-col sm:flex-row gap-4 mt-10">

        {
          isEditing ? (

            <button
              onClick={handleUpdate}
             className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition "
            >
              Save Changes
            </button>

          ) : (

            <>
              <button
                onClick={() => setIsEditing(true)}
               className="bg-blue-500/20 backdrop-blur-md border border-blue-400/40 text-blue-300  hover:text-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 active:scale-95 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Edit Profile
              </button>

              <button
                onClick={handleDelete}
               className="bg-red-500/10 backdrop-blur-md border border-red-400/30 text-red-300  hover:text-white hover:border-red-500 hover:shadow-lg hover:shadow-red-500/40 hover:scale-105 active:scale-95 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Delete Account
              </button>
            </>

          )
        }

      </div>

    </div>

  // </div>

)

}

export default Profile