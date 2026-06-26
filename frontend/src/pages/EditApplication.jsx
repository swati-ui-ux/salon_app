import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const EditApplication = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    companyName: "",
    jobTitle: "",
    status: "",
    notes: ""

  })

  const getSingleApplication = async () => {

    try {

      const response = await api.get(
        `/applications/${id}`
      )

      setFormData(response.data.application)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    getSingleApplication()

  }, [])

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await api.put(

        `/applications/${id}`,

        formData

      )

      toast.success(response.data.message)

      navigate("/all-applications")

    } catch (error) {

      console.log(error)

      toast.error("Update failed")

    }

  }

  return (

    <div className="min-h-screen bg-[#0f172a] flex justify-center items-center p-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#1e293b]/90 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl shadow-black/40 p-8 space-y-5"
      >

        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Edit Application
        </h1>

        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />

        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full bg-[#0f172a]/70 border border-slate-600 text-white p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        >

          <option className="bg-[#1e293b] text-white" value="Applied">
            Applied
          </option>

          <option value="Interview Scheduled">
            Interview Scheduled
          </option>

          <option value="Interviewed">
            Interviewed
          </option>

          <option value="Rejected">
            Rejected
          </option>

          <option value="Offered">
            Offered
          </option>

          <option value="Hired">
            Hired
          </option>

        </select>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full h-32 bg-[#0f172a]/70 border border-slate-600 text-white placeholder-gray-400 p-3 rounded-xl outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 resize-none"
        />

        <button
          className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold p-3 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          Update Application
        </button>

      </form>

    </div>

  )

}

export default EditApplication