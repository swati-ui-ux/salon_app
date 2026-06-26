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

    <div className="min-h-screen bg-[#0f172a] flex justify-center items-center p-6">

      <div className="w-full max-w-2xl bg-[#1e293b]/90 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl shadow-black/40 p-8">

        <h1 className="text-3xl font-bold text-center mb-8 text-white">
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
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <input
            type="text"
            name="companySize"
            placeholder="Company Size"
            value={formData.companySize}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <input
            type="text"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <input
            type="text"
            name="hrName"
            placeholder="HR Name"
            value={formData.hrName}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <input
            type="email"
            name="hrEmail"
            placeholder="HR Email"
            value={formData.hrEmail}
            onChange={handleChange}
           className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full h-28 bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          />

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold p-3 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            Update Company
          </button>

        </form>

      </div>

    </div>

  )

}

export default EditCompany