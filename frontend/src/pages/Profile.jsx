import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../utils/api'

const UpdateProfile = () => {

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    street: "",
    apartment: "",
    zip: "",
    city: "",
    country: ""

  })

  const [editMode, setEditMode] = useState(false)

  // GET PROFILE

  useEffect(() => {

    fetchProfile()

  }, [])

  const fetchProfile = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await api.get(

        "/user/profile",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      setFormData(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  // HANDLE CHANGE

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    })

  }

  // UPDATE PROFILE

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const token = localStorage.getItem("token")

      const response = await api.put(

        "/user/profile",

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      toast.success(response.data.message)

      setEditMode(false)

    } catch (error) {

      toast.error("Update failed")

    }

  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
          My Profile
        </h1>

        {

          !editMode ? (

            <div className="space-y-5">

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Name</p>
                  <h2 className="font-semibold">{formData.name}</h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Email</p>
                  <h2 className="font-semibold">{formData.email}</h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Phone</p>
                  <h2 className="font-semibold">{formData.phone}</h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Street</p>
                  <h2 className="font-semibold">{formData.street}</h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Apartment</p>
                  <h2 className="font-semibold">{formData.apartment}</h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Zip</p>
                  <h2 className="font-semibold">{formData.zip}</h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">City</p>
                  <h2 className="font-semibold">{formData.city}</h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Country</p>
                  <h2 className="font-semibold">{formData.country}</h2>
                </div>

              </div>

              <button

                onClick={() => setEditMode(true)}

                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"

              >
                Edit Profile
              </button>

            </div>

          ) : (

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl outline-none"
              />

              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl outline-none"
              />

              <input
                type="text"
                placeholder="Street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl outline-none"
              />

              <input
                type="text"
                placeholder="Apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl outline-none"
              />

              <input
                type="text"
                placeholder="Zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl outline-none"
              />

              <input
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl outline-none"
              />

              <input
                type="text"
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl outline-none"
              />

              <div className="flex gap-4">

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
                >
                  Cancel
                </button>

              </div>

            </form>

          )

        }

      </div>

    </div>

  )

}

export default UpdateProfile