// pages/EditCompany.jsx

import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const EditCompany = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    hrName: "",
    hrEmail: "",
    location: "",
    notes: ""

  })

  // Get Single Company
  const getSingleCompany = async () => {

    try {

      const response = await api.get(
        `/companies/${id}`
      )

      setFormData(response.data.company)

    } catch (error) {

      console.log(error)

      toast.error("Failed to load company")

    }

  }

  useEffect(() => {

    getSingleCompany()

  }, [])

  // Handle Change
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })

  }

  // Update Company
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await api.put(

        `/companies/${id}`,

        formData

      )

      toast.success(response.data.message)

      navigate("/add-company")

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        "Update failed"
      )

    }

  }

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-8">
          Edit Company
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="companySize"
            placeholder="Company Size"
            value={formData.companySize}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="hrName"
            placeholder="HR Name"
            value={formData.hrName}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="email"
            name="hrEmail"
            placeholder="HR Email"
            value={formData.hrEmail}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl h-28"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
          >
            Update Company
          </button>

        </form>

      </div>

    </div>

  )

}

export default EditCompany