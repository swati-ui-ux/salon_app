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

    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl space-y-4"
      >

        <h1 className="text-3xl font-bold text-center">
          Edit Application
        </h1>

        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        >

          <option value="Applied">
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
          className="w-full border p-3 rounded-xl h-32"
        />

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
        >
          Update Application
        </button>

      </form>

    </div>

  )

}

export default EditApplication