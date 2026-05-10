import React, { useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'
import AllApplications from './AllApplications'

const AddJobApplication = () => {

  const [formData, setFormData] = useState({

    companyName: "",
    jobTitle: "",
    jobLocation: "",
    salary: "",
    jobLink: "",
    status: "Applied",
    applicationDate: "",
    notes: "",
    followUpDate: ""

  })

  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData({

      ...formData,

      [name]: value

    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await api.post(

        "/applications/create",

        formData

      )

      toast.success(response.data.message)

      // Reset form
      setFormData({

        companyName: "",
        jobTitle: "",
        jobLocation: "",
        salary: "",
        jobLink: "",
        status: "Applied",
        applicationDate: "",
        notes: "",
        followUpDate: ""

      })

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        "Failed to add application"
      )

    }

  }

  return (
<>
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-8">
          Add Job Application
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
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="jobLocation"
            placeholder="Job Location"
            value={formData.jobLocation}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="jobLink"
            placeholder="Job Link"
            value={formData.jobLink}
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

          <div>

            <label className="block mb-1 font-medium">
              Application Date
            </label>

            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

          </div>

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl h-28"
          />

          <div>

            <label className="block mb-1 font-medium">
              Follow Up Date
            </label>

            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
          >
            Add Application
          </button>

        </form>

      </div>

      </div>
      <AllApplications/>
</>

  )

}

export default AddJobApplication