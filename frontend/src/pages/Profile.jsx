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

      <div className="text-center mt-10 text-2xl">
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

    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <div className="flex flex-col items-center">

          <img
            src={
              formData.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          {
            isEditing ? (

              <input
                type="text"
                name="profileImage"
                placeholder="Profile Image URL"
                value={formData.profileImage}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg mt-4"
              />

            ) : null
          }

          {
            isEditing ? (

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg mt-4"
              />

            ) : (

              <h1 className="text-3xl font-bold mt-4">
                {user.name}
              </h1>

            )
          }

          <p className="text-gray-500">
            {user.email}
          </p>

        </div>

        <div className="mt-8 space-y-4">

          {/* Phone */}

          <div>

            <h2 className="font-semibold">
              Phone
            </h2>

            {
              isEditing ? (

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />

              ) : (

                <p className="text-gray-600">
                  {user.phone}
                </p>

              )
            }

          </div>

          {/* Career Goal */}

          <div>

            <h2 className="font-semibold">
              Career Goal
            </h2>

            {
              isEditing ? (

                <textarea
                  name="careerGoal"
                  value={formData.careerGoal}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />

              ) : (

                <p className="text-gray-600">
                  {user.careerGoal || "Not Added"}
                </p>

              )
            }

          </div>

          {/* City */}

          <div>

            <h2 className="font-semibold">
              City
            </h2>

            {
              isEditing ? (

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />

              ) : (

                <p className="text-gray-600">
                  {user.city || "Not Added"}
                </p>

              )
            }

          </div>

          {/* Country */}

          <div>

            <h2 className="font-semibold">
              Country
            </h2>

            {
              isEditing ? (

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />

              ) : (

                <p className="text-gray-600">
                  {user.country || "Not Added"}
                </p>

              )
            }

          </div>

        </div>

        <div className="mt-6">

          {
            isEditing ? (

              <button
                onClick={handleUpdate}
                className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl"
              >
                Save Changes
              </button>

            ) : (
<>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
              >
                Edit Profile
                  </button>
                  <button
  onClick={handleDelete}
  className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl mt-3"
>
  Delete Account
</button>
</>
                

            )
          }

        </div>

      </div>

    </div>

  )

}

export default Profile